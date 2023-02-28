const pool = require('../../configs/index.js');

class Cart {
    async getCart (userID) {
        var data = await pool.query(`SELECT * FROM public."Cart" c
                                            join public."Products" p on c."ProductID"=p."ProductID"
                                            WHERE c."UserID"=${userID};`)
        return data;
    }
    async addNotExist (userID, productID) {
        await pool.query(`INSERT INTO public."Cart"(
                        "UserID", "ProductID", "Amount")
                        VALUES (${userID}, ${productID}, 1);`)
    }
    async addExist (userID, productID, amount) {
        await pool.query(`UPDATE public."Cart"
                        SET "Amount"=${amount}
                        WHERE "ProductID"=${productID} and "UserID"=${userID}; `)
    }
    async Delete (userID, productID) {
        await pool.query(`DELETE FROM public."Cart"
                        WHERE "ProductID"=${productID} and "UserID"=${userID};`)
    }
}

module.exports = new Cart ;