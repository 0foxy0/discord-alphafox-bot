const client = require("../../index");
const Discord = require("discord.js");
const { serverIP } = require("../../config.json");

    client.on("messageCreate", async message => {

        if (message.content.toString().includes(" IP") || message.content.toString().includes(" ip") || message.content.toString().includes(" Ip")
        || message.content.toString().includes(" iP") || message.content.startsWith("ip") || message.content.startsWith("IP")
        || message.content.startsWith("Ip") || message.content.startsWith("iP")) {

            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s IP`)
            .setColor("BLURPLE")
            .setDescription(`**Java IP**: ${serverIP}\n**Bedrock IP**: ${serverIP}\n**Port**: 25566`)
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")             
            
            message.channel.send({embeds: [embed]});
        }
    })