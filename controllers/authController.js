const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

//User Registration Function
module.exports.registerUser = async function (req, res) {
    try {
        let {fullname, email, password, contact} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) {
            req.flash("error", "User already exist");   
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        fullname,
                        password : hash,
                        contact,
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);
                    req.flash("success", "User Created Successfully");
                    res.redirect("/");
                }
            });
        });
    }
    catch(err){
        res.send(err.message);
    }
};

//User Login Function
module.exports.loginUser = async function (req, res){
    let {email, password } = req.body;

    let user = await userModel.findOne({email: email});
    if(!user){
        req.flash("error", "User does not exist");
        return res.redirect("/");
    } 

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("success", "Logged in successfully");
            res.redirect("/shop");
        }
        else{
            req.flash("error", "Invalid Email or Password");
            res.redirect("/");
        }
    })
};

// User Logout Function
module.exports.logoutUser = function (req, res) {
    try {
        // Clear the token cookie by setting it with an expired date
        res.cookie("token", "");

        // Redirect to the home page or login page
        req.flash("success", "Logged out successfully");
        res.redirect("/");
    } catch (err) {
        // Handle any potential errors
        res.send(err.message);
    }
};
