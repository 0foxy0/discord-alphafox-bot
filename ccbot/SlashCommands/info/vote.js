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
        .setTitle(`CityCrafting's Vote Link`)
        .setDescription("**Minecraft-Server.eu**: https://minecraft-server.eu/vote/index/21C8C\n**MClist.eu**: https://mclist.eu/server/118")
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        interaction.followUp({embeds: [embed]});
    }

}