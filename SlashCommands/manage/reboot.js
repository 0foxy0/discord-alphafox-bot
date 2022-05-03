const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require('child_process');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("reboot")
    .setDescription("Reloadet das Bot-Script!")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        if (interaction.user.id === "402176311335976981") {
            interaction.followUp("Der Bot wird neugestartet!");
            exec("pm2 reload index");
        
        } else {
            interaction.followUp("Das ist ein Command nur für echte Füchse ^^");
        }

    }

}