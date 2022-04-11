const { model, Schema } = require("mongoose");

module.exports = model("giveaways", new Schema({

    HosterID: String,
    MessageID: String,
    ChannelID: String,
    StartAt: Number,
    EndAt: Number,
    Ended: Boolean,
    Prize: String,
    WinnerCount: Number,
    WinnerID: Array
    
}));