var mongoose = require("mongoose");

// SCHENA SETUP
var commentSchema = new mongoose.Schema({
    body    : String,
    author  : {
                id: {type    : mongoose.Schema.Types.ObjectId,
                     ref     : 'User'
                },
                username: String
              },
    createed_at : { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model("Comment",commentSchema);