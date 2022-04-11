const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/levelDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("statsreset")
    .setDescription("Setzt die Stats von dir oder einem Spieler zurück!")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Der Spieler von dem die Stats zurückgesetzt werden!")
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

        const mention = interaction.options.getMember("spieler");

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            if (mention) {
                const found = await DB.findOne({ MemberID: mention.id });
                if (!found) {
                    interaction.followUp(`Der Spieler ${mention} hat keine Stats!`);
                    return;
                }
    
                await DB.updateOne({ MemberID: mention.id }, { XP: 0, ReqXP: 100, Level: 1 });
                interaction.followUp(`Die Stats von ${mention} wurden zurückgesetzt!`);
    
            } else {
                
                const found = await DB.findOne({ MemberID: interaction.user.id });
                if (!found) {
                    interaction.followUp(`Du hast keine Stats!`);
                    return;
                }

                await DB.updateOne({ MemberID: interaction.user.id }, { XP: 0, ReqXP: 100, Level: 1 });
                interaction.followUp(`Deine Stats wurden zurückgesetzt!`);
            }

        } else {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");

            setTimeout(() => {
                interaction.channel.bulkDelete(parseInt(1), true)
              }, 1000 * 3)
        }

    },
};