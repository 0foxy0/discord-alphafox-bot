const client = require("../../index");

client.on("messageCreate", async msg => {

    if ((msg.channel.id === "843598991177285693" || msg.channel.id === "854834180847042560") &&
       (!msg.author.bot && !msg.member.permissions.has("ADMINISTRATOR") && msg.attachments.size === 0)) {
           
        msg.delete();
        msg.channel.send(`Dieser Channel ist **nur** für **Bilder**!\nBitte lies dir nochmal die **Regeln** durch!`);

        setTimeout(() => {
            msg.channel.bulkDelete(1, true);
        }, 5 * 1000);
    
    } else return;
})