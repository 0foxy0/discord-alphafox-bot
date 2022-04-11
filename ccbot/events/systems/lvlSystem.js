const client = require("../../index");
const Discord = require("discord.js");
const DB = require("../../schemas/levelDB");

client.on("messageCreate", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const lvlChannel = message.guild.channels.cache.get("942249719307042856");
    let addXp = Math.floor(Math.random() * 9) + 1;

    const found = await DB.findOne({ MemberID: message.author.id });
    if (!found) {
        DB.create({
            GuildID: message.guild.id,
            MemberID: message.author.id,
            XP: 0,
            Level: 1,
            ReqXP: 100
        })

    } else {
        let xpAtm = found.XP;
        await DB.updateOne({ MemberID: message.author.id }, { XP: xpAtm += addXp })

        const found2 = await DB.findOne({ MemberID: message.author.id });
        if (found2.XP >= parseInt(found2.ReqXP)) {

            let ReqXpAtm = parseInt(found2.ReqXP);
            let levelAtm = parseInt(found2.Level);

            let raise = ReqXpAtm *= 2.25; //xp die man braucht erhöhen
            const round = Math.floor(raise); //reqxp runden

            await DB.updateOne({ MemberID: message.author.id }, { ReqXP: round, Level: levelAtm += 1 });

            const found3 = await DB.findOne({ MemberID: message.author.id });
    
            lvlChannel.send(`${message.author} ist jetzt Level **` + found3.Level + '**!');
        }
    }

})