const Discord = require("discord.js");
const client = require("../../index");
const fetch = require("node-superfetch");
const DB = require("../../schemas/youtubeDB");
const youtubeChn = "918061126665777152";


setInterval(async function() {

    const creatorList = await DB.find({ ID: "youtube" });

    if (!creatorList) return;

    for (const creator of creatorList) {

        const product = await fetch.get(`https://decapi.me/youtube/latest_video?id=${creator.CreatorID}`);
        const title = product.body.toString().split("- https://youtu.be/");
        const title2 = creator.Product.toString().split("- https://youtu.be/");
    
        if (!creator.Product) {
            await DB.updateOne({ CreatorID: creator.CreatorID }, { Product: product.body.toString() });
        
        }

        if (title2[1] !== title[1]) {

            await DB.updateOne({ CreatorID: creator.CreatorID }, {  Send: true, Product: product.body.toString() });
        
        } else {
            await DB.updateOne({ CreatorID: creator.CreatorID }, { Send: false });
        }
    
        DB.findOne({ CreatorID: creator.CreatorID }, async (err, docs) => {
    
            const newsChannel = client.channels.cache.get(youtubeChn);
    
            if (docs.Send === true) {
    
                const embed = new Discord.MessageEmbed()
                .setAuthor({ "name": `${creator.Creator.toUpperCase()} hat ein neues Video hochgeladen!` })
                .setTitle(`${title[0]}`)
                .setURL(`https://youtu.be/${title[1]}`)
                .setImage(`https://img.youtube.com/vi/${title[1]}/0.jpg`)
                .setColor("RED")
                .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/c0cc15492-foxy-original.png");
        
    
                if (docs.Sent === false) {
                    
                    await newsChannel.send({ embeds: [embed] }).then(

                        await DB.updateOne({ CreatorID: creator.CreatorID }, { Sent: true })
                        )
    
                }
    
            } else if (docs.Send === false) {

                await DB.updateOne({ CreatorID: creator.CreatorID }, { Sent: false });
            }
    
    
        })

    }

}, 120000)