const { model, Schema } = require("mongoose");

module.exports = model("levels", new Schema({

    GuildID: String,
    MemberID: String,
    XP: Number,
    Level: String,
    ReqXP: String
    
}));