const UserM = require('../models/UserM.js');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

class VerifyController {
    //post
    async post_verify(req, res) {
        try {
            const token = jwt.verify(req.body.token, process.env.SECRET);
            res.send({result: true});
        }
        catch(err) {
            res.send({result: false});
        }
    }
}


module.exports = new VerifyController;