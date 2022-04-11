const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("social")
    .setDescription("Zeigt dir die Sozialen Medien von CityCrafting")
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
        .setTitle(`CityCrafting's Socialmedia`)
        .addFields(
            {name: "Website", value: "https://citycrafting.de"},
            {name: "Twitch", value: "https://twitch.tv/craftcityhd"},
            {name: "Instagram", value: "https://instagram.com/craftcityhd"},
            {name: "Youtube", value: "https://www.youtube.com/channel/UCNDEfwEN3eCUwCdRBe-lHaw"},
            {name: "Twitter", value: "https://twitter.com/CraftCityHD1"},
            {name: "Facebook", value: "https://www.facebook.com/CityCrafting2021"}
        )
        .setFooter("Bot developed by F.O.X.Y", "")
        .setThumbnail("")                

        interaction.followUp({embeds: [embed]});
    }

}