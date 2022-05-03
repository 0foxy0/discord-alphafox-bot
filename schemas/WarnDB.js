const { model, Schema } = require("mongoose");

module.exports = model("warns", new Schema({

    MemberID: String,
    Warns: Number,
    
}));