const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Aktiviert oder Deaktiviert den Slowmode des Chats")
    .addStringOption(option => 
        option
            .setName("zeit")
            .setDescription("Die Zeit in Sekunden oder 0 zum deaktivieren")
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

        if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
            const time = interaction.options.getString("zeit");
            
            if (parseInt(time) > 21600) return interaction.followUp("Du kannst max 6h einstellen!");

            interaction.channel.setRateLimitPerUser(time);
        
            if (time === "0") {
                interaction.followUp("Slowmode wurde deaktiviert!")
        
            } else {
            interaction.followUp(`Slowmode ist auf ${time}sek aktiviert!`);
            }
        
        } else {
        interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");
        
        setTimeout(() => {
            interaction.channel.bulkDelete(parseInt(1), true)
          }, 1000 * 3)    
        }
    }

}