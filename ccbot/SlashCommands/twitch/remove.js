const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/twitchDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("removetwitch")
    .setDescription("Entfernt eine Stream Benachrichtigung")
    .addStringOption(option => 
        option
            .setName("streamer")
            .setDescription("Der Twitch username")
            .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        let streamer = interaction.options.getString("streamer");

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            let found = await DB.findOne({ Streamer: streamer });

            if (!found) {

                interaction.followUp(`Der Streamer ${streamer} hat keine Notification!`);

            } else {

                await DB.findOneAndDelete({ Streamer: streamer });
                interaction.followUp(`Der Streamer ${streamer} wurde aus der Liste entfernt!`);

            }

        } else {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");

            setTimeout(() => {
                interaction.channel.bulkDelete(parseInt(1), true)
              }, 1000 * 3)
        }
    
    },
};