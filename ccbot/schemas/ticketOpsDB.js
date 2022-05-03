const { model, Schema } = require("mongoose");

module.exports = model("ticketops", new Schema({

    GuildID: String,
    SupRoleID: String,
    ApplyRoleID: String,
    BugRoleID: String,
    
}));