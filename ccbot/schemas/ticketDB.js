const { model, Schema } = require("mongoose");

module.exports = model("tickets", new Schema({

    GuildID: String,
    MemberID: String,
    ChannelID: String,
    Closed: Boolean,
    Locked: Boolean,
    Type: String
    
}));