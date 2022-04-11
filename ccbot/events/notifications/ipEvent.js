const client = require("../../index");
const Discord = require("discord.js");

    client.on("messageCreate", async message => {

        if (message.content.toString().includes(" IP") || message.content.toString().includes(" ip") || message.content.toString().includes(" Ip")
        || message.content.toString().includes(" iP") || message.content.startsWith("ip") || message.content.startsWith("IP") || message.content.startsWith("Ip")
        || message.content.startsWith("iP")) {

            const embed = new Discord.MessageEmbed()
            .setTitle("CityCraftings IP")
            .setColor("BLURPLE")
            .setDescription("**Java IP**: CityCrafting.eu\n**Bedrock IP**: CityCrafting.eu\n**Port**: 19132")
            .setFooter("Bot developed by F.O.X.Y", "")                
            .setThumbnail("")                
            
            message.channel.send({embeds: [embed]});
        }
    })