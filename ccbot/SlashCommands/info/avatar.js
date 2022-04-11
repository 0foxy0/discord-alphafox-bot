const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Zeigt dir dein/sein Avatar")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Wenn gewollt der Spieler dessen Avatar gezeigt werden soll")
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

        let mentionedMember = interaction.options.getUser("spieler");

        if (!mentionedMember) {
            mentionedMember = interaction.user;

            const embed = new Discord.MessageEmbed()
            .setTitle(mentionedMember.tag + "s Avatar")
            .setImage(mentionedMember.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setFooter("Bot developed by F.O.X.Y", "")

            interaction.followUp({embeds: [embed]})
        
        } else {

            const embed = new Discord.MessageEmbed()
            .setTitle(mentionedMember.tag + "s Avatar")
            .setImage(mentionedMember.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setFooter("Bot developed by F.O.X.Y", "")

        interaction.followUp({embeds: [embed]})
        }
    
    },
};