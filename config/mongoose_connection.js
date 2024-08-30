const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatch")

.then(function(){
    console.log("Database Connected Successfully");
})
.catch(function(err){
    console.log("Error connecting database...", err);
})

module.exports = mongoose.connection;