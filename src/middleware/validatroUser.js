const { check } = require('express-validator');

const validator = (req, res, next) => {
    const validations = [
        check('password')
            .exists()
            .withMessage('La contraseña es obligatoria')
            .isLength({ min: 4 })
            .withMessage('La contraseña debe tener al menos 4 caracteres'),

        check('email')
            .exists()
            .withMessage('El correo electrónico es obligatorio')
            .isEmail()
            .withMessage('El correo electrónico no es válido')
    ];

    if (req.path === '/registro') {
        validations.push(
            check('username')
                .exists()
                .withMessage('El nombre de usuario es obligatorio')
                .isLength({ min: 5 })
                .withMessage('El nombre de usuario debe tener al menos 5 caracteres')
        );
    }

    validations.forEach(validation => validation(req, res, next));
};

module.exports = validator;


