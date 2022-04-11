const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/youtubeDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("removeyoutube")
    .setDescription("Entfernt eine Video Benachrichtigung!")
    .addStringOption(option => 
        option
            .setName("creator")
            .setDescription("Der Youtube username klein geschrieben!")
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

        let creatorName = interaction.options.getString("creator");

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            let found = await DB.findOne({ Creator: creatorName });

            if (!found) {

                interaction.followUp(`Der Creator **${creatorName}** hat **keine** Notification!`);

            } else {

                await DB.findOneAndDelete({ Creator: creatorName });
                interaction.followUp(`Der Creator **${creatorName}** wurde aus der Liste **entfernt**!`);

            }

        } else {
            interaction.followUp("Du bist nicht mein Chef du kannst das nicht tuen!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true);
              }, 1000 * 3)
        }
    
    },
};