const ownerModel = require('../models/owner_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

//Owners Registration function
module.exports.registerOwner =  async function (req, res) {
    try {
        let {fullname, email, password} = req.body;
        
        let owner = await ownerModel.findOne({email: req.body.email});
        if(owner){
            req.flash("error", "Owner already exist");
            res.redirect("/");
        }
        
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message)
                else {
                    let owner =   await ownerModel.create({
                        fullname,
                        email,
                        password: hash,
                    });

                    let token = generateToken(owner);
                    res.cookie("token", token);
                    req.flash("success", "Owner created successfully");
                    res.redirect("/owners");
                }
            })
        })
    }
    catch(err){
        res.send(err.message);
    }
};

//Owners Login Function
module.exports.loginOwner = async function (req, res){
    let {email, password } = req.body;

    let owner = await ownerModel.findOne({email: email});
    if(!owner){
        req.flash("error", "User does not exist");
        return res.redirect("/owners");
    } 

    bcrypt.compare(password, owner.password, function(err, result){
        if(result){
            let token = generateToken(owner);
            res.cookie("token", token);
            req.flash("success", "Logged in successfully");
            res.redirect("/owners/admin");
        }
        else{
            req.flash("error", "Invalid Email or Password");
            res.redirect("/owners");
        }
    })
};

//Owner Logout Function
module.exports.logoutOwner = function (req, res) {
    try {
        // Clear the token cookie by setting it with an expired date
        res.cookie("token", "");

        // Redirect to the home page or login page
        req.flash("success", "Logged out successfully");
        res.redirect("/owners");
    } catch (err) {
        // Handle any potential errors
        res.send(err.message);
    }
};