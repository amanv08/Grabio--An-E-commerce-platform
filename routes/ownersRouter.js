const express = require('express');
const router = express.Router();
const { registerOwner, loginOwner, logoutOwner } = require('../controllers/ownerController');

//Owner register and login page
router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("owner", { error, success, loggedin: false});
});

//Owner register route
router.post("/register", registerOwner);

//Owner login route
router.post("/login", loginOwner);

//Owner logout route
router.get("/logout", logoutOwner);

router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { success, loggedin: false });  
})


module.exports = router;