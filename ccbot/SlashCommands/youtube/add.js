const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/youtubeDB");
const fetch = require("node-superfetch");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Erstellt eine Video Benachrichtigung!")
    .addStringOption(option => 
        option
            .setName("creator")
            .setDescription("Der Youtube username klein geschrieben!")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("creatorid")
            .setDescription("Die Youtube ChannelID des Creators!")
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

        const creatorName = interaction.options.getString("creator");
        const creatorID = interaction.options.getString("creatorid");

        if (creatorID.includes("@")) return interaction.followUp(`Dieser Creator existiert nicht!`);
        const product = await fetch.get(`https://decapi.me/youtube/latest_video?id=${creatorID}`);
        if (product.body.toString().includes("An error occurred")) return interaction.followUp(`Ein Fehler ist aufgetreten! Melde dich bei einem @Discord-Admin!`);


        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            let found = await DB.findOne({ CreatorID: creatorID });

            if (!found) {
                await DB.create({
                    ID: "youtube",
                    Creator: creatorName,
                    CreatorID: creatorID,
                    Product: product.body.toString(),
                    Send: false,
                    Sent: false
                });

                await interaction.followUp(`Der Creator **${creatorName}** wurde zu den Notifications **hinzugefügt**!`);
            
            } else {
                interaction.followUp(`Der Creator **${creatorName}** hat **bereits** eine Notification!`);
            }

        } else {
            interaction.followUp("Du bist nicht mein Chef du kannst das nicht tuen!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)
        }
    
    },
};