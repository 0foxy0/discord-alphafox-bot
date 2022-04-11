const client = require("../../index");
const Discord = require("discord.js");
const perms = require("../../permissions.json");
const fs = require("fs");

client.on("messageCreate", async message => {
        
    if (message.content.startsWith("cc!ticket")) {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("Du bist nicht mein Chef du kannst das nicht tuen!");

            setTimeout(() => {
                message.channel.bulkDelete(parseInt(2), true)
              }, 1000 * 3)
        }

        let channel = message.mentions.channels.first();
        let category;
        let modroles = message.mentions.roles;

        message.guild.channels.cache.forEach(chn => {
            if (chn.type == "GUILD_CATEGORY" && !category && chn.name.toLowerCase() == "tickets") {
                category = chn;
            }
        })

        if (!channel) {
            message.reply("Du musst den Channel angeben!");

            setTimeout(() => {
                message.channel.bulkDelete(parseInt(2), true)
            }, 1000 * 3)
        }

        if (!category) {
            await message.guild.channels.create("tickets", {
                type: "GUILD_CATEGORY",
                PermissionOverwrites: [
                    {id: message.guild.id, deny: ["VIEW_CHANNEL"]},
                    {id: client.user.id, allow: ["VIEW_CHANNEL"]},
                ]
            }).then(l => category = l);
        }


        let l = [
        {id: message.guild.id, deny: ["VIEW_CHANNEL"]},
        {id: client.user.id, allow: ["VIEW_CHANNEL"]},
        ]

        modroles.forEach(role => {
            l.push({id: role.id, allow: ["VIEW_CHANNEL"]})
        })


        perms[message.guild.id] = l;

        fs.writeFileSync("./permissions.json", JSON.stringify(perms));

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("Support Ticket")
            .setCustomId("support_ticket")
            .setStyle("PRIMARY")
            .setEmoji("🎫"),
    
            new Discord.MessageButton()
            .setLabel("Bug Ticket")
            .setCustomId("bug_ticket")
            .setStyle("DANGER")
            .setEmoji("🐞"),

            new Discord.MessageButton()
            .setLabel("Bewerbung Ticket")
            .setCustomId("apply_ticket")
            .setStyle("SUCCESS")
            .setEmoji("📬")

        );

        const embed = new Discord.MessageEmbed()
        .setTitle("Ticket öffnen")
        .setDescription("Du benötigst Hilfe oder hast ein Anliegen?" + "\n" + 
        "Du wirst dann mit den Supportern verbunden!" + "\n" + "\n" +
        "Das Ticket kannst du mit 🎫, 📬 oder 🐞 eröffnen")
        .setColor("GREEN")
        .setThumbnail("")
        .setFooter("Bot developed by F.O.X.Y", "")


        channel.send({embeds: [embed], components: [row]});

        message.delete();
    }
})