const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const user = require('../models/user');
const { log } = require('console');
const bcrypt = require('bcryptjs');

const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

module.exports = {
    index: (req, res) => {
        res.render('users', { users });
    },
    register: (req, res) => {
        res.render('register');
    },

    create : (req, res) => {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                old: req.body
            });
        }
        
        let userInData  = user.findByField('email', req.body.email);

        if (userInData) {
            return res.render('register', {
                errors: {
                    email : {
                        msg: 'El email ya esta registrado'
                    }
                },
                old: req.body
            });
        }

        let userCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        }

        user.create(userCreate);

        console.log(userCreate);
        res.redirect('/users/login');
    },

    formLogin: (req, res) => {
        res.render('login');
    },

    login: (req, res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('login', {
                errors: resultValidation.mapped(),
                old: req.body
            });
        }

        const emailReq = req.body.email;
        const userLog = user.findByField('email', emailReq);
        if (!userLog) {
            return res.render('login', {
                errors: {
                    email : {
                        msg: 'Credenciales incorrectas'
                    }
                },
                old: req.body
            });
        }
 
        if (!bcrypt.compareSync(req.body.password, userLog.password)){
            return res.render('login', {
                errors: {
                    password : {
                        msg: 'Contraseña incorrecta'
                    }
                },
                old: req.body
            });
        }

        if (req.body.remember) {
            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        }

        delete userLog.password;
        req.session.userLog = userLog;
        res.redirect('/users/perfil');
    },

    logout : (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    profile : (req, res) => {
        console.log('Entrando al perfil : ',req.cookies.userEmail);
        res.render('profile', { user: req.session.userLog });
    }

};