const client = require("../../index");
const Discord = require("discord.js");
const DB = require("../../schemas/giveawayDB");

setInterval(async () => {
    const giveawayList = await DB.find({ Ended: false });
    if (!giveawayList) return;

    for (const giveaway of giveawayList) {
        const date = Math.round(new Date().getTime()/1000.0);

        if (date >= giveaway.EndAt) {
            try {
                const channel = client.channels.cache.get(giveaway.ChannelID);
                if (!channel) return console.log(`Keinen Channel von dem Giveaway ${giveaway.Prize} gefunden!`);
                const msg = await channel.messages.fetch(giveaway.MessageID);
                if (!msg) return console.log(`Keine Nachricht von dem Giveaway ${giveaway.Prize} gefunden!`);

                const reaction = msg.reactions.cache.get("🎉");
                reaction.users.fetch().then(async users => {

                    let participants = [];

                    users.forEach(user => {
                        const member = channel.guild.members.cache.get(user.id);
                        if (member.user.bot) return;
                        if (member.permissions.has("ADMINISTRATOR" || "MANAGE_MESSAGES" || "BAN_MEMBERS")) return;

                        participants.push(user.id);
                    });

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Gewinn: ${giveaway.Prize}`)
                    .setColor("NOT_QUITE_BLACK")
                    .setFooter("Bot developed by F.O.X.Y", "")
                    .setTimestamp();

                    if (participants.length === 0) return (
                        msg.edit({content: "❌ **GIVEAWAY BEENDET** ❌", embeds: [embed.setDescription(`**ERROR**: Keine Teilnehmer!`)]})
                        .then(await DB.updateOne({ MessageID: giveaway.MessageID }, { Ended: true }, { new: true }))
                    );

                    if (giveaway.WinnerCount > participants.length) return (
                        msg.edit({content: "❌ **GIVEAWAY BEENDET** ❌", embeds: [embed.setDescription(`**ERROR**: Zu wenige Teilnehmer!`)]})
                        .then(await DB.updateOne({ MessageID: giveaway.MessageID }, { Ended: true }, { new: true }))
                    );

                    const winners = [];

                    for(let i=0; i < giveaway.WinnerCount; i++) {
                        winners.push(participants[Math.floor(Math.random()*participants.length)]);

                        let double = false;

                        for (let j=0; j<i; j++) {

                            if (winners[j] === winners[i]) {
                                double = true;
                                break;
                            }
                        }

                        if (double) {
                            winners.pop();
                            i--;
                        }
                    }

                    if (!winners) return;

                    let winnerMSG = ``;
                    winners.forEach(winner => {

                        winnerMSG += `<@${winner}> `;
                    });
            
                    msg.edit({content: "❌ **GIVEAWAY BEENDET** ❌", embeds: [embed.setDescription(`Verlost von: <@${giveaway.HosterID}>\nGewinner: ${winnerMSG}`)]});
                    await channel.send(`Herzlichen Glückwunsch ${winnerMSG}!\nGewonnener Preis: **${giveaway.Prize}**`);

                    await DB.updateOne({ MessageID: giveaway.MessageID }, { Ended: true, WinnerID: winners }, { new: true });
                })

            } catch (err) {
                console.log(err);
            }
        }
    }

}, 5000);