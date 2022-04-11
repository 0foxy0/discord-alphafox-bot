const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const helpConf = require("./helpList.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("help")
    .setDescription("Zeigt dir deine/seine Help Liste")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Wenn gewollt der Spieler dessen Help Liste gezeigt werden soll")
            .setRequired(false)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

    const target = interaction.options.getMember("spieler");

    if (!target) {

            if (interaction.member.permissions.has("ADMINISTRATOR")) {

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

                interaction.followUp({embeds: [embed], components: [row]});

            } else if (interaction.member.permissions.has("BAN_MEMBERS")) {

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

                interaction.followUp({embeds: [embed], components: [row]});

            } else if (interaction.member.permissions.has("MANAGE_MESSAGES")) {

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

                interaction.followUp({embeds: [embed], components: [row]});

            } else {
            
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`CityCrafting's Befehle`)
                .addFields(helpConf.else)
                .setFooter("Bot developed by F.O.X.Y", "")
                .setThumbnail("")

                interaction.followUp({embeds: [embed]});
            }

    } else {

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

                if (target.permissions.has("ADMINISTRATOR")) {

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
                    .setTitle(`${target.user.username}'s Helpliste`)
                    .addFields(helpConf.admin)
                    .setFooter("Bot developed by F.O.X.Y", "")
                    .setThumbnail("")                
    
                    interaction.followUp({embeds: [embed], components: [row]});
    
                } else if (target.permissions.has("BAN_MEMBERS")) {

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
                    .setTitle(`${target.user.username}'s Helpliste`)
                    .addFields(helpConf.ban)
                    .setFooter("Bot developed by F.O.X.Y", "")
                    .setThumbnail("")
    
                    interaction.followUp({embeds: [embed], components: [row]});
    
                } else if (target.permissions.has("MANAGE_MESSAGES")) {

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
                    .setTitle(`${target.user.username}'s Helpliste`)
                    .addFields(helpConf.manage)
                    .setFooter("Bot developed by F.O.X.Y", "")
                    .setThumbnail("")
    
                    interaction.followUp({embeds: [embed], components: [row]});
    
                } else {
                
                    const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${target.user.username}'s Helpliste`)
                    .addFields(helpConf.else)
                    .setFooter("Bot developed by F.O.X.Y", "")
                    .setThumbnail("")
    
                    interaction.followUp({embeds: [embed]});
                }

        } else {
            interaction.followUp(`Du bist nicht mein Chef, das kannst du nicht tun!`);
        
            setTimeout(() => {
             interaction.channel.bulkDelete(parseInt(1), true)
           }, 1000 * 3)
         }

    }



    }

}