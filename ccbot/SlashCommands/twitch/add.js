const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/twitchDB");
const fetch = require("node-superfetch");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("twitch")
    .setDescription("Erstellt eine Stream Benachrichtigung")
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

        if (streamer.includes("@")) return interaction.followUp(`Dieser Streamer existiert nicht!`);

        const twitchCheck = await fetch.get(`https://decapi.me/twitch/accountage/${streamer}`);
        if (twitchCheck.body.toString().includes("User not found")) return interaction.followUp(`Dieser Streamer existiert nicht!`);

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            let found = await DB.findOne({ Streamer: streamer });

            if (!found) {
                await DB.create({
                    ID: "twitch",
                    Streamer: streamer,
                    Send: false,
                    Sent: false
                });

                interaction.followUp(`Der Streamer ${streamer} wurde zu den Notifications hinzugefügt!`);
            
            } else {
                interaction.followUp(`Der Streamer ${streamer} hat bereits eine Notification!`);
            }

        } else {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");

            setTimeout(() => {
                interaction.channel.bulkDelete(parseInt(1), true)
              }, 1000 * 3)
        }
    
    },
};