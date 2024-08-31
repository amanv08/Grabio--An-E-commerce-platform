const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

//User Registration Function
module.exports.registerUser = async function (req, res) {
    try {
        let {fullname, email, password, contact} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.redirect("/");

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
    if(!user) return res.redirect("/");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            res.redirect("/");
        }
    })
};