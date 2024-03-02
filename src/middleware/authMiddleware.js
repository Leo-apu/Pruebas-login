
function authMiddleware(req, res, next) {
    if (req.session.userLog) {
        return next();
    }
    return res.redirect('/users/login');
}

module.exports =    authMiddleware;