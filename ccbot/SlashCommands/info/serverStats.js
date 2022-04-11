const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fetch = require("node-superfetch");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("mcstats")
    .setDescription("Zeigt dir Infos über den Server")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        const response = await fetch.get("https://eu.mc-api.net/v3/server/ping/citycrafting.eu");

        if (response.body.online === true) {
            const embed = new Discord.MessageEmbed()
            .setTitle('CityCrafting.eu')
            .addFields(
                {name: 'Status:', value: `online`},
                {name: 'Spieler:', value: `${response.body.players.online}/${response.body.players.max}`},
                {name: 'Version:', value: `${response.body.version.name}`}
            )
            .setColor('RANDOM')
            .setFooter("Bot developed by F.O.X.Y", "")
            .setThumbnail('')                
                
            interaction.followUp({embeds: [embed]});
    
        } else if (response.body.online === false) {

            const embed = new Discord.MessageEmbed()
            .setTitle('CityCrafting.eu')
            .addFields(
                {name: 'Status:', value: `offline`},
                {name: 'Spieler:', value: `${response.body.players.online}/${response.body.players.max}`},
                {name: 'Version:', value: `${response.body.version.name}`}
            )
            .setColor('RANDOM')
            .setFooter("Bot developed by F.O.X.Y", "")
            setThumbnail('')                
                
            interaction.followUp({embeds: [embed]});
    
        } else return;
    }

}