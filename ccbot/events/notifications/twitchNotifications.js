const Discord = require("discord.js");
const client = require("../../index.js");
const fetch = require("node-superfetch");
const DB = require("../../schemas/twitchDB");


setInterval(async function() {

    const streamerList = await DB.find({ ID: "twitch" });

    if (!streamerList) return;

    for (const streamer of streamerList) {

        const uptime = await fetch.get(`https://decapi.me/twitch/uptime/${streamer.Streamer}`);
        const avatar = await fetch.get(`https://decapi.me/twitch/avatar/${streamer.Streamer}`);
        const viewers = await fetch.get(`https://decapi.me/twitch/viewercount/${streamer.Streamer}`);
        const title = await fetch.get(`https://decapi.me/twitch/title/${streamer.Streamer}`);
        const game = await fetch.get(`https://decapi.me/twitch/game/${streamer.Streamer}`);
    
        if (uptime.body.toString() !== `${streamer.Streamer} is offline`) {
            await DB.updateOne({ Streamer: streamer.Streamer }, { Send: true })
        
        } else if (uptime.body.toString() === `${streamer.Streamer} is offline`) {
            await DB.updateOne({ Streamer: streamer.Streamer }, { Send: false })
    
        }
    
        DB.findOne({ Streamer: streamer.Streamer }, async (err, docs) => {
    
            const newsChannel = client.channels.cache.get("918061126665777152");
    
            if (docs.Send === true) {
    
                const embed = new Discord.MessageEmbed()
                .setAuthor({ "name": `${streamer.Streamer.toUpperCase()} ist jetzt Live!`, "iconUrl": `${avatar.body}` })
                .setTitle(`${title.body}`)
                .setThumbnail(`${avatar.body}`)
                .setURL(`https://www.twitch.tv/${streamer.Streamer}`)
                .addFields(
                    {name: "Spiel", value: `${game.body}`, inline: true},
                    {name: "Zuschauer", value: `${viewers.body}`, inline: true}
                )
                .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.Streamer}-620x378.jpg`)
                .setColor("BLURPLE")
        
    
                if (docs.Sent === false) {
                    
                    await newsChannel.send({ embeds: [embed] }).then(async msg => {

                        await DB.updateOne({ Streamer: streamer.Streamer }, { Sent: true, MsgID: msg.id  });

                    })
    
                } else if (docs.Sent === true) {
    
                    const sentMsg = await newsChannel.messages.fetch(docs.MsgID);
                    if (!sentMsg) return;
                    sentMsg.edit({embeds: [embed]})
                }
    
            } else if (docs.Send === false) {
    
                if (docs.MsgID && docs.Sent === true) {
                    const embedOff = new Discord.MessageEmbed()
                    .setAuthor({ "name": `${streamer.Streamer.toUpperCase()}`, "iconUrl": `${avatar.body}` })
                    .setTitle(`Der Stream ist Offline!`)
                    .setThumbnail(`${avatar.body}`)
                    .setURL(`https://www.twitch.tv/${streamer.Streamer}`)
                    .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.Streamer}-620x378.jpg`)
                    .setColor("NOT_QUITE_BLACK")
    
                    const sentMsg = await newsChannel.messages.fetch(docs.MsgID);
                    if (!sentMsg) return;
                    sentMsg.edit({embeds: [embedOff]})
                }

                await DB.updateOne({ Streamer: streamer.Streamer }, { Sent: false });
            }
    
    
        })

    }

}, 120000)