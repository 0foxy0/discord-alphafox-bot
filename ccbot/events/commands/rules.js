const client = require("../../index");
const Discord = require("discord.js");
const fs = require("fs");

let ticketChannel = "816053070046691368";
const ruleRole = "802977911589830676";
const unidentified = "869195642596126771";

client.on("messageCreate", async message => {

    if (message.content.startsWith("cc!regeln")) {
        if (message.member.permissions.has("ADMINISTRATOR")) {

            let embed = new Discord.MessageEmbed()
            .setTitle("CityCrafting")
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
                "> - Bei Problemen ein Ticket in " + `<#${ticketChannel}>` + " öffnen!"
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
                "Wenn du auf unserem Minecraft Server spielst linke deinen Account mit !link (in einem Discord Chat) dann erklärt dir der Bot den Rest!"
                + "\n" + "\n" +
                "Akzeptiere die Regeln mit dem ✅"
            )
            .setColor("PURPLE")
            .setFooter("Bot developed by F.O.X.Y", "")
                    
            let button = new Discord.MessageButton()
            .setLabel("Bestätigen")
            .setCustomId("rules_button")
            .setStyle("SUCCESS")
            .setEmoji("✅")

            let row = new Discord.MessageActionRow()
            .addComponents(button);

            await message.channel.send({embeds: [embed], components: [row]})
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
                interaction.member.roles.add(unidentified).catch(e => {console.log(e)});

            } else if (interaction.member.roles.resolve(unidentified)) {

                interaction.user.send(`Du hast die Regeln auf **${interaction.guild.name}** bestätigt!`).catch(e => console.log(e));
                interaction.member.roles.add(ruleRole).catch(e => {console.log(e)})
                interaction.member.roles.remove(unidentified).catch(e => {console.log(e)});
            }
    }
})