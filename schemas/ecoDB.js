const { model, Schema } = require("mongoose");

module.exports = model("economies", new Schema({

    GuildID: String,
    MemberID: String,
    Coins: Number,
    Level: Number
    
}));