const client = require("../../index");
const Discord = require("discord.js");
const helpConf = require("../../SlashCommands/info/helpList.json");

client.on("interactionCreate", async interaction => {

    if (interaction.customId == "next_page_admin") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("vorherige Seite")
            .setCustomId("last_page_admin")
            .setStyle("DANGER")
            .setEmoji("⬅"),

            new Discord.MessageButton()
            .setLabel("nächste Seite")
            .setCustomId("next_page_admin2")
            .setStyle("PRIMARY")
            .setEmoji("➡")

        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle Seite 2`)
        .addFields(helpConf.admin2)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 2", ephemeral: true});

    } else if (interaction.customId == "next_page_admin2") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("vorherige Seite")
            .setCustomId("last_page_admin2")
            .setStyle("DANGER")
            .setEmoji("⬅")

        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle Seite 3`)
        .addFields(helpConf.admin3)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 3", ephemeral: true});

    } else if (interaction.customId == "next_page_ban") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("vorherige Seite")
            .setCustomId("last_page_ban")
            .setStyle("DANGER")
            .setEmoji("⬅")

        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle Seite 2`)
        .addFields(helpConf.ban2)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 2", ephemeral: true});


    } else if (interaction.customId == "next_page_manage") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("vorherige Seite")
            .setCustomId("last_page_manage")
            .setStyle("DANGER")
            .setEmoji("⬅")

        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle Seite 2`)
        .addFields(helpConf.manage2)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 2", ephemeral: true});

    } else if (interaction.customId == "last_page_admin2") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("vorherige Seite")
            .setCustomId("last_page_admin")
            .setStyle("DANGER")
            .setEmoji("⬅"),

            new Discord.MessageButton()
            .setLabel("nächste Seite")
            .setCustomId("next_page_admin2")
            .setStyle("PRIMARY")
            .setEmoji("➡")

        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle Seite 2`)
        .addFields(helpConf.admin2)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 2", ephemeral: true});

    } else if (interaction.customId == "last_page_admin") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("nächste Seite")
            .setCustomId("next_page_admin")
            .setStyle("PRIMARY")
            .setEmoji("➡")

        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle`)
        .addFields(helpConf.admin)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 1", ephemeral: true});

    } else if (interaction.customId == "last_page_ban") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("nächste Seite")
            .setCustomId("next_page_ban")
            .setStyle("PRIMARY")
            .setEmoji("➡")
            
        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle`)
        .addFields(helpConf.ban)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 1", ephemeral: true});

    } else if (interaction.customId == "last_page_manage") {

        const msg = interaction.message;

        const row = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setLabel("nächste Seite")
            .setCustomId("next_page_manage")
            .setStyle("PRIMARY")
            .setEmoji("➡")
            
        );

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`CityCrafting's Befehle`)
        .addFields(helpConf.manage)
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")

        msg.edit({embeds: [embed], components: [row]});
        interaction.reply({content: "Seite 1", ephemeral: true});

    }
})