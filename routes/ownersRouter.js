const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner_model');


if(process.env.NODE_ENV === "development") {
    
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            return res.status(503).send("Not Allowed to create owner");
        }

        let {fullname, email, password} = req.body;
        let createdOwner =   await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(200).send(createdOwner);
    });
}


router.get("/", (req, res) => {
    res.send("Its again working");
});


module.exports = router;