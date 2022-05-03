const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("social")
    .setDescription("Zeigt dir die Sozialen Medien!")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${interaction.guild.name}'s Socialmedia`)
        .addFields(
            {name: "Website", value: ""},
            {name: "Twitch", value: ""},
            {name: "Instagram", value: ""},
            {name: "Youtube", value: ""},
            {name: "Twitter", value: ""},
            {name: "Facebook", value: ""}
        )
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")               

        interaction.followUp({embeds: [embed]});
    }

}