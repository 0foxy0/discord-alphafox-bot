const client = require("../../index");
const Discord = require("discord.js");

    client.on("messageCreate", async message => {

        if (message.content.toString().includes("Bewerbung") || message.content.toString().includes("bewerben")) {

            const embed = new Discord.MessageEmbed()
            .setTitle("CityCrafting Bewerben")
            .setColor("BLURPLE")
            .setDescription(`Du möchtest dich bewerben?\n
            Gern, gehe dazu auf\n
             https://citycrafting.de/index.php?route=/bewerbung/\n   
            Dort kannst du die Vorraussetzungen einsehen und eine Bewerbung auf die jeweilige stelle abgeben.\n
            Oder über das Ticket im Discord!`)
            .setFooter("Bot developed by F.O.X.Y", "")                
            .setThumbnail("")                
            
            message.channel.send({embeds: [embed]});
        }
    })