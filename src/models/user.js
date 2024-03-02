const fs = require('fs'); // libreria para trabajar con archivos
const path = require('path');
const crypto = require('crypto'); //libreria para generar un id aleatorio

//objeto literal
const user = {
    //Guarda la direccion del archivo json
    filename : 'src/data/users.json',

    //Lee el archivo json. Retorna un array de objetos. 
    getData: function () {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    //Retorna todos los usuarios
    findAll : function () {
        return this.getData();
    },

    //Busca un usuario por su id
    findById : function (id) {
        return this.getData().find(user => user.id === id);
    },

    //Busca un usuario por su campo y valor
    findByField : function (field, text) {
        return this.getData().find(user => user[field] === text);
    },

    // Crea el usuario y lo agrega al archvio json.
    create : function (data) {
        const users = this.findAll();
        const newUser = {
            id : crypto.randomBytes(5).toString('hex'),
            ...data
        }
        users.push(newUser);
        fs.writeFileSync(this.filename, JSON.stringify(users, null, 2));
        return true;
    },

    //Actualiza un usuario
    update : function (id, data) {
        const users = this.findAll();
        const index = users.findIndex(user => user.id === id);
        users[index] = {
            id,
            ...data
        };
        fs.writeFileSync(this.filename, JSON.stringify(users, null, 2));
        return true;
    },

    //Elimina un usuario
    delete : function (id) {
        const users = this.findAll();
        const index = users.findIndex(user => user.id === id);
        users.splice(index, 1);
        fs.writeFileSync(this.filename, JSON.stringify(users, null, 2));
        return true;
    },

}

module.exports = user;