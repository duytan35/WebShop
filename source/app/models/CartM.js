const pool = require('../../configs/index.js');

class Cart {
    async getCart (userID) {
        var data = await pool.query(`SELECT "UserID", "ProductID", "dateAdd"
                                            FROM public."Cart"
                                            WHERE "UserID"=${userID};`)
        return data;
    }
    async Add (userID, productID) {
        var categories = await pool.query(`SELECT * FROM public."Categories" ORDER BY "CategoryID" ASC `)
        return categories;
    }
    async Delete (userID, productID) {
        var categories = await pool.query(`SELECT * FROM public."Categories" ORDER BY "CategoryID" ASC `)
        return categories;
    }
}

module.exports = new Cart ;