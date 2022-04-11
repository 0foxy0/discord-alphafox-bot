const { model, Schema } = require("mongoose");

module.exports = model("notifications", new Schema({

    ID: String,
    Streamer: String,
    Send: Boolean,
    Sent: Boolean,
    MsgID: String
    
}));