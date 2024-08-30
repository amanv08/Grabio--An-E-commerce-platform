const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Its again working");
});


module.exports = router;