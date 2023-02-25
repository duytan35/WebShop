const UserM = require('../models/UserM.js');
bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterController {
    //get
    index(req, res) {
        res.render("register");
    }
    //post
    async post_register(req, res) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hashed = bcrypt.hashSync(req.body.password, salt);
        var isSuccess = await UserM.register(req.body.username, password_hashed, req.body.name, req.body.address);
        if (isSuccess) {
            res.send({result: true});
        }
        else res.send({result: false});
    }
}


module.exports = new RegisterController;