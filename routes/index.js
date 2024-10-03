const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product_model');
const userModel = require('../models/user_model');

//Render login and register page for user
router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, success, loggedin: false});
});

//Render Shop page after checking user is logged in or not
router.get("/shop", isLoggedIn(userModel), async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/addtocart/:productid", isLoggedIn(userModel), async (req, res) => {
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/cart", isLoggedIn(userModel), async (req, res) => {
    let user = await userModel.findOne({email : req.user.email}).populate("cart");
    
    // Calculate the total bill
    let totalBill = user.cart.reduce((total, item) => {
        // Ensure item.price and item.discount are numbers
        let price = Number(item.price) || 0;
        let discount = Number(item.discount) || 0;
        let totals = price - discount;
        return  totals;
    }, 0);

    res.render("cart", { user, totalBill });
});
    

module.exports = router;