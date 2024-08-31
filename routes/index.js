const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

//Render login and register page
router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", {error});
});

//Render Shop page after checking user is logged in or not
router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
});

module.exports = router;