var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    CreateJWT: function (user) {
        var payload = {
            sub: user.Id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, 'TOKEN_SECRET');
    },
    EnsureAuthenticated: function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.headers.authorization.split(' ')[1];
        var payload = null;
        try {
            payload = jwt.decode(token, 'TOKEN_SECRET');
        }
        catch (err) {
            return res.status(401).send({ message: err.message });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }
        req.userID = payload.sub;
        next();
    }
};
