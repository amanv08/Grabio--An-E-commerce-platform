const express = require('express');
const router = express.Router();
const upload = require('../config/multer_config');
const productModel = require('../models/product_model');
const ownerModel = require('../models/owner_model');
const isLoggedIn = require('../middlewares/isLoggedIn')


router.post("/create", isLoggedIn(ownerModel), upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
        let ownerId = req.user.id;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor, 
        });

        let owner = await ownerModel.findById(ownerId);
        console.log("Owner is:", owner);
        // Check if the owner exists
        if (!owner) {
            req.flash("error", "Owner not found");
            return res.redirect("/owners/admin");
        }

        // Ensure products field is initialized
        if (!owner.products) {
            owner.products = [];  // Initialize as an empty array if undefined
        }
        owner.products.push(product._id); // Add the product ID to the owner's products array
        await owner.save();

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err){
        res.send(err.message);
    }
});


module.exports = router;