var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

// SCHENA SETUP
var userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    registered_at : { type: Date, required: true, default: Date.now },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);