const pool = require('../../configs/index.js');
var jwt = require('jsonwebtoken');

class User {
    async register (username, pwHashed, name, address) {
        var getUsername = await pool.query(`SELECT ("Username") FROM public."Users" WHERE "Username" = '${username}';`)
        if (getUsername.rowCount == 0){
            var id = 1;
            var res = await pool.query('SELECT MAX("UserID") FROM public."Users";');
            if(res.rowCount > 0) id = res.rows[0].max+1;
            var refreshToken = jwt.sign({
                data: username
            }, process.env.SECRET);
            
            var Query = `INSERT INTO public."Users"("UserID", "Username", "Password", "FullName", "Token", "Address") VALUES (${id}, '${username}', '${pwHashed}', '${name}', '${refreshToken}', '${address}')`;
            console.log(Query);
            pool.query(Query);
            return true;
        }
        return false;
    }
    async getUser (username) {
        var User = await pool.query(`SELECT * FROM public."Users" WHERE "Username" = '${username}';`)
        return User;
    }
}

module.exports = new User;