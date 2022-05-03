const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { notesChannel } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Entstummt einen Spieler")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Der Spieler der entstummt werden soll")
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
            const user = interaction.options.getMember("spieler");

            if (user.isCommunicationDisabled(true)) {
                user.timeout(0, "UNMUTE")
                interaction.followUp(`${user} wurde entstummt!`);


                const embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`UNMUTE`)
                    .setDescription(`${interaction.user} entstummt ${user}`)
                    .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")

                client.channels.cache.find(channel => channel.id === notesChannel).send({embeds: [embed]}).catch(e => console.log(e));
            
            } else {
                interaction.followUp(`${user} ist nicht gestummt!`);
            }

        } else {
            interaction.followUp(`${interaction.user}` + "Du bist nicht mein Chef, das kannst du nicht tun!");
            
            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)
        }
    }

}