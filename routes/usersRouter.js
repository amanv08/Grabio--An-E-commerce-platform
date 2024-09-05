const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

router.get("/", (req, res) => {
    res.send("Its again working");
});

//User Register route
router.post("/register",registerUser); //registerUser function called from authController.js

//User Login route
router.post("/login",loginUser); //loginUser function called from authController.js

//user logout route
router.get("/logout", logoutUser);//logoutUser function called from authController.js

//Exported this routes to user in index.js
module.exports = router;