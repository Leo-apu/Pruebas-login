// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
const userController = require('../controllers/userController');

// ************ Middleware Require ************
const upload = require('../middleware/multer');
const  validator = require('../middleware/validatroUser');
const guestMiddleware = require('../middleware/guestMiddleware');
const  authMiddleware  = require('../middleware/authMiddleware');

router.get('/', userController.index);

router.get('/registro', guestMiddleware ,userController.register);
router.post('/registro', upload.single('image'), validator ,userController.create);

router.get('/login', guestMiddleware, userController.formLogin);
router.post('/login', validator, userController.login);

router.get('/perfil', authMiddleware, userController.profile);

router.get('/logout', userController.logout);   

module.exports = router;