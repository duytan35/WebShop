var jwt = require('jsonwebtoken');
const CategoryM = require('../models/CategoryM');
const ProductM = require('../models/ProductM');
const CartM = require('../models/CartM');

class SiteController {
    // / or /khac
    async index(req, res) {

        var isExp;
    
        if (!req.cookies.token){
            if(!req.cookies['refresh-token']){
                res.redirect('/login')
            }
            else{
                const refresh = jwt.verify(req.cookies['refresh-token'], process.env.SECRET);
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour
                    data: refresh.data
                  }, process.env.SECRET);
                res.cookie('token', token);
            }
        }
        else {
            try {
                jwt.verify(req.cookies.token, process.env.SECRET);
                var isExp = false;
            }
            catch {
                var isExp = true;
            }
            if (isExp || Date.now() >= jwt.verify(req.cookies.token, process.env.SECRET).exp * 1000){
                if(!req.cookies['refresh-token']){
                    res.redirect('/login')
                }
                else{
                    const refresh = jwt.verify(req.cookies['refresh-token'], process.env.SECRET);
                    req.cookies.token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour
                        data: refresh.data
                      }, process.env.SECRET);
                }
            }
        }
        
        var Categories = await CategoryM.getAllCategory();
        var Products = await ProductM.getAllProduct();
        res.render("home", {Name_Categories: Categories.rows, Products: Products.rows});
    }
    // /i lay 1 danh muc
    async getCategory(req, res) {
        var CatID = req.url.slice(1);
        var Categories = await CategoryM.getAllCategory();
        var Products = await ProductM.getProducts(CatID);
        res.render("home", {Name_Categories: Categories.rows, Products: Products.rows});
    }

    async getCart(req, res) {
        var data = await CartM.getCart(req.body.userID);
        res.send({data: data});
    }
    async addToCart(req, res) {

    }
    async deleteToCart(req, res) {
        
    }
}

module.exports = new SiteController;