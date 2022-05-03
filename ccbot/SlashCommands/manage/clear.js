const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("clear")
    .setDescription("löscht Nachrichten")
    .addIntegerOption(option => 
        option
            .setName("anzahl")
            .setDescription("Die Anzahl der Nachrichten die gelöscht werden sollen")
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

        if(interaction.member.permissions.has("MANAGE_MESSAGES")){
            let number = interaction.options.getInteger("anzahl");

            if(isNaN(number)) return interaction.followUp("Gib eine gültige Zahl an!");
            if(number >= 100) return interaction.followUp("Du kannst nicht mehr als 99 Nachrichten löschen!");
            if(number < 1) return interaction.followUp("Du musst mindestens eine Nachricht löschen!");
        
            await interaction.channel.bulkDelete(number + 1, true);
        
           } else {
               interaction.followUp(`Du bist nicht mein Chef, das kannst du nicht tun!`);
           
               setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)
            }
    }

}