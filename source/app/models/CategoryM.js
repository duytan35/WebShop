const pool = require('../../configs/index.js');

class Category {
    async getAllCategory () {
        var categories = await pool.query(`SELECT * FROM public."Categories" ORDER BY "CategoryID" ASC `)
        return categories;
    }
}

module.exports = new Category ;
