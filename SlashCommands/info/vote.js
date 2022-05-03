const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Zeigt dir den Vote Link")
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
        .setTitle(`${interaction.guild.name}'s Vote Link`)
        .setDescription("**Minecraft-Server.eu**: \n**MClist.eu**: ")
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")               

        interaction.followUp({embeds: [embed]});
    }

}