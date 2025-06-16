let mongoose = require("mongoose");
let userrequiredfield = mongoose.Schema({
    fullname: String,
    gender: String,
    email: String,
    password: String,
    isadmin:Boolean
})

module.exports = mongoose.model("User", userrequiredfield);