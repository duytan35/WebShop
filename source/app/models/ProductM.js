const pool = require('../../configs/index.js');

class Product {
    async getAllProduct () {
        var products = await pool.query(`SELECT * FROM public."Products" ORDER BY "ProductID" ASC `)
        return products;
    }
    async getProducts (CatID) {
        var products = await pool.query(`select * from public."Categories" c
        join public."Products" p on c."CategoryID" = p."CategoryID"
        where c."CategoryID" = ${CatID} `)
        return products;
    }
}

module.exports = new Product;