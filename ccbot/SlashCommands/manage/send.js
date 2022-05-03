const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { notesChannel } = require("../../config");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("send")
    .setDescription("Sendet eine DM an eine Person")
    .addUserOption(option => 
        option
            .setName("person")
            .setDescription("Die Person an die die Nachricht gehen soll")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("nachricht")
            .setDescription("Die Nachricht die gesendet werden soll")
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

        let person = interaction.options.getUser("person");
        let msg = interaction.options.getString("nachricht");

        if (interaction.member.permissions.has("ADMINISTRATOR")) {
            let error = false;

            await person.send(msg).catch(e => {console.log(e); interaction.followUp("Die Nachricht konnte nicht versendet werden da die Personen DMs ausgeschaltet hat!"); error = true;});
            
            if (error === false) {
                interaction.followUp(`Die Nachricht wurde an ${person} gesendet!`);
                
                const notesChannel2 = interaction.guild.channels.cache.get(notesChannel);

                const embed = new Discord.MessageEmbed()
                .setColor("DARK_ORANGE")
                .setTitle(`Privat Nachricht`)
                .setDescription(`${interaction.user} hat eine private Nachricht gesendet` + "\n\n" + "**Person**" + "\n" + `${person}` + "\n" + "**Nachricht**" + "\n" + `${msg}`)
                .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")

                notesChannel2.send({embeds: [embed]});
                
            } else return;

        } else {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");
    
            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
            }, 1000 * 3)
        }
    
    },
};