var utils = require('./../utils/utils');
var _ = require('lodash');
var users=[
    {id:1,userName:"admin",password:"admin"},
    {id:2,userName:"user1",password:"password"},
    {id:3,userName:"user2",password:"password"},
    ]

var authenticate = function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var userIndex = _.findIndex(users, { userName: userName, password: password });
    if (userIndex != '-1') {
        var token = utils.CreateJWT(users[userIndex]);
        res.send({ token: token });
    } else {
        res.status(500).end('Invalid credentials.');
    }
}

module.exports = function (app) {
    app.post('/api/login', authenticate);
}