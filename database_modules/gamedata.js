let mongoose = require("mongoose");

let gamerequirement = mongoose.Schema({
    name: String,
    tag: String,
    android: Boolean,
    window: Boolean,
    discription:String,
    cover: String,
    apk: String,
    Zip: String,
    s1: String,
    s2: String,
    s3: String,
    s4: String,
    s5:String,
    males: Number,
    females:Number
})

module.exports = mongoose.model("Game", gamerequirement);
