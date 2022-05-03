const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/twitchDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("notifications")
    .setDescription("Liste der Stream Benachrichtigungen")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            const streamerList = await DB.find({ ID: "twitch" });

            if (!streamerList) return interaction.followUp(`Es ist kein Eintrag in der Liste!`);

            const embed = new Discord.MessageEmbed()
            .setTitle("Streamer Liste")
            .setColor("BLURPLE")
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")

            for (const data of streamerList) {

                if (data.Send === true) {
                    embed.addFields({name: `${data.Streamer}`, value: `Live!`})
                
                } else if (data.Send === false) {
                    embed.addFields({name: `${data.Streamer}`, value: `Offline`})
                }
            }
            return interaction.followUp({embeds: [embed]});

        } else {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)
        }
    
    },
};