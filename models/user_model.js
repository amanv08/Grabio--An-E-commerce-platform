const mongoose = require('mongoose');

//User Schema Here
const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    contact : Number,
    cart : {
        type : Array,
        default :[]
    },
    orders : {
        type : Array,
        default : []
    },
    picture : String,
});

module.exports = mongoose.model('user', userSchema);