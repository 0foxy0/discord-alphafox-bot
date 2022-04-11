const { model, Schema } = require("mongoose");

module.exports = model("tempchannels", new Schema({

    MemberID: String,
    ChannelID: String,
    UserLimit: String
    
}));