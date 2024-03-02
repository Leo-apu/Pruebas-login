const { check, validationResult } = require('express-validator');

// Arreglo base de validación para la contraseña y el correo electrónico
const baseValidator = [
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

// Función para agregar la validación del nombre de usuario si está presente en el formulario
function addUsernameValidationIfPresent(req, res, next) {
    // Si el nombre de usuario está presente en el formulario, agregamos la validación
    if (req.body.username) {
        baseValidator.unshift(
            check('username')
                .isLength({ min: 5 })
                .withMessage('El nombre de usuario debe tener al menos 5 caracteres')
        );
    }
    next();
}

// Middleware de validación completo que se exportará
const validator = [addUsernameValidationIfPresent, ...baseValidator];

module.exports = validator;

