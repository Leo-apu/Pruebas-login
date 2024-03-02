function guestMiddleware (req, res, next) {
    if (req.session.userLog) {
        console.log('entro al gueswt',req.session.userLog);
        return res.redirect('/users/perfil');
    }
    return next();
}

module.exports = guestMiddleware