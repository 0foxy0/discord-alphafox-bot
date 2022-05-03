const client = require("../../index");
const Discord = require("discord.js");
const fs = require("fs");
const { prefix, crtTicketChn, ruleRole, unidentifiedRole } = require("../../config.json");

client.on("messageCreate", async message => {

    if (message.content.startsWith(prefix + "regeln")) {
        if (message.member.permissions.has("ADMINISTRATOR")) {

            const craftingTable = message.guild.emojis.cache.find(e => e.name == "crafting_table");
            const facebook = message.guild.emojis.cache.find(e => e.name == "facebook");
            const discord = message.guild.emojis.cache.find(e => e.name == "discord");
            const twitch = message.guild.emojis.cache.find(e => e.name == "twitch");

            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .setDescription(
                "**Discord Regeln**"
                + "\n" +
                "> - Nicht spammen!"
                + "\n" +
                "> - Die Channel für die jeweiligen Themen benutzen und nicht für etwas anderes"
                + "\n" +
                "> - Keine Werbung!"
                + "\n" +
                "> - Nett bleiben und nicht beleidigen!"
                + "\n" +
                "> - Teammitglieder zu beleidigen wird mit einem Ban bestraft!"
                + "\n" +
                "> - Keine Links schicken!"
                + "\n" +
                "> - Bei Problemen ein Ticket in " + `<#${crtTicketChn}>` + " öffnen!"
                + "\n" +
                "> - An Anweisungen von Teammitglieder halten!"
                + "\n" +
                "> - Nicht sich als jemand anderes ausgeben!"
                + "\n" +
                "> - Das Taggen von Teammitglieder in normalen Chats ist untersagt! Bei Wiederholung führt dies zu einem Tages Mute!"
                + "\n" + "\n" +
                "**Minecraft Regeln**"
                + "\n" +
                "> - Im Chat nett bleiben und nicht beleidigen!"
                + "\n" +
                "> - Teammitglieder zu beleidigen wird mit einem Monat Ban bestraft!"
                + "\n" +
                "> - Unangebrachte Bauten werden sofort entfernt und mit einem Ban von 1 Monat bestraft!"
                + "\n" +
                "> - Unvollständige Grundstücke werden nach 90 Tagen automatisch gelöscht!"
                + "\n" +
                "> - Scammen ist verboten!"
                + "\n" +
                "> - Bugusing wird mit einem Monat Ban bestraft!"
                + "\n" + "\n" +
                "**Umfrage**"
                + "\n" +
                "Wie seit ihr auf uns aufmerksam geworden?"
                + "\n" + "\n" +
                `Facebook = ${facebook}`
                + "\n" +
                `Minecraft-server.eu = ${craftingTable}`
                + "\n" +
                `Freunde = 🤝`
                + "\n" +
                `Andere Discord Server = ${discord}`
                + "\n" +
                `Twitch Stream = ${twitch}`
                + "\n" +
                `Sonstiges = 🎪`
            )
            .setColor("PURPLE")
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
                    
            let button = new Discord.MessageButton()
            .setLabel("Bestätigen")
            .setCustomId("rules_button")
            .setStyle("SUCCESS")
            .setEmoji("✅")

            let row = new Discord.MessageActionRow()
            .addComponents(button);

            const msg = await message.channel.send({embeds: [embed], components: [row]});
            msg.react(facebook);
            msg.react(craftingTable);
            msg.react("🤝");
            msg.react(discord);
            msg.react(twitch);
            msg.react("🎪");
            message.delete();

            }
        }
    })

    client.on("interactionCreate", async interaction => {
        if (interaction.customId == "rules_button") {
            interaction.deferUpdate();

            if (interaction.member.roles.resolve(ruleRole)) {
                
                interaction.user.send(`Du hast die Regeln auf **${interaction.guild.name}** entstätigt!`).catch(e => console.log(e));
                interaction.member.roles.remove(ruleRole).catch(e => {console.log(e)});
                interaction.member.roles.add(unidentifiedRole).catch(e => {console.log(e)});

            } else if (interaction.member.roles.resolve(unidentifiedRole)) {

                interaction.user.send(`Du hast die Regeln auf **${interaction.guild.name}** bestätigt!`).catch(e => console.log(e));
                interaction.member.roles.add(ruleRole).catch(e => {console.log(e)})
                interaction.member.roles.remove(unidentifiedRole).catch(e => {console.log(e)});
            }
    }
})