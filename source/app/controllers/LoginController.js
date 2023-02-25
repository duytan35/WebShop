const UserM = require('../models/UserM.js');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

class LoginController {
    //get
    index(req, res) {
        res.render("login");
    }
    //post
    async post_login(req, res) {
        var user = await UserM.getUser(req.body.username);
        if(user.rowCount > 0) {
            var rs = await bcrypt.compare(req.body.password, user.rows[0].Password)
            if(rs){
                var loginTime = req.body.loginTime;
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (loginTime * 60),
                    data: req.body.username
                  }, process.env.SECRET);
                res.send({result: true, mess : "", token: token, refresh: user.rows[0].Token, userID: user.rows[0].UserID, fullName: user.rows[0].FullName});
            }
            else res.send({result: false , mess : "Password wrong!"});
        }
        else {
            res.send({result: false, mess : "Username isn't exist!"});
        }
    }
}


module.exports = new LoginController;