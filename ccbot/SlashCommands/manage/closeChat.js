const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { notesChannel, privateChatCat } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("closechat")
    .setDescription("Schließt den privaten Chat")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        if (interaction.channel.parent == privateChatCat) {

            const embed = new Discord.MessageEmbed()
                .setColor("DEFAULT")
                .setTitle(`Privat Chat`)
                .setDescription(`<@${interaction.user.id}> hat einen privaten Chat gelöscht` + "\n\n" + "**Chat Name**" + "\n" + `${interaction.channel.name}`)
                .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
            client.channels.cache.get(notesChannel).send({embeds: [embed]});
    
        interaction.followUp("@here" + "\n" + interaction.user.username + " löscht den privaten Chat in 15 Sekunden!");
    
    
        setTimeout(() => {
            interaction.channel.delete().catch(e => {console.log(e); interaction.channel.send("@here" + "\n" + "Der private Chat konnte nicht gelöscht werden versuche es erneut und kontaktiere einen @Discord-Admin")});
        }, 1000 * 15)
    }


        }
    }