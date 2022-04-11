const { model, Schema } = require("mongoose");

module.exports = model("youtubecreators", new Schema({

    ID: String,
    Creator: String,
    CreatorID: String,
    Product: String,
    Send: Boolean,
    Sent: Boolean
    
}));