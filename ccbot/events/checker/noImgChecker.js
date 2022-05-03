const client = require("../../index");
const { teamPicChn, picChn } = require("../../config.json");

client.on("messageCreate", async msg => {

    if ((msg.channel.id === teamPicChn || msg.channel.id === picChn) &&
       (!msg.author.bot && !msg.member.permissions.has("ADMINISTRATOR") && msg.attachments.size === 0)) {
           
        msg.delete();
        msg.channel.send(`Dieser Channel ist **nur** für **Bilder**!\nBitte lies dir nochmal die **Regeln** durch!`);

        setTimeout(() => {
            msg.channel.bulkDelete(1, true);
        }, 5 * 1000);
    
    } else return;
})