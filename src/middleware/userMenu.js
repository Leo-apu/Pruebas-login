const { compareSync } = require('bcryptjs');
const { login, logout } = require('../controllers/userController');
const user = require('../models/user');

function userMenu(req, res, next) {
    res.locals.isLoged = false;

    let emailCookie = req.cookies.userEmail;
    let userFromCookie = user.findByField('email', emailCookie);

    console.log(emailCookie, userFromCookie);

    if (userFromCookie) {
        req.session.userLog = userFromCookie;
    }

    if (req.session && req.session.userLog) {
        res.locals.isLoged = true;
        res.locals.userLog = req.session.userLog;
    }

    next();
}

module.exports = userMenu