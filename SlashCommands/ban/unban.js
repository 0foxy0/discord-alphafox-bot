const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { notesChannel } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Entbannt einen Spieler")
    .addStringOption(option => 
        option
            .setName("spielerid")
            .setDescription("Die ID von dem Spieler der entbannt werden soll")
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

        if (interaction.member.permissions.has("BAN_MEMBERS")) {
            const member = interaction.options.getString("spielerid");

                try {
                interaction.guild.bans.fetch().then( bans => {

                    interaction.guild.members.unban(member);

                });

                const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`UNBAN`)
                .setDescription(`${interaction.user} entbannt <@${member}>`)
                .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
                await client.channels.cache.find(channel => channel.id === notesChannel).send({embeds: [embed]}).catch(e => console.log(e));

                } catch (e) {
                    interaction.channel.send("Es ist ein Fehler aufgetreten!" +"\n"+ "Melde dich bitte bei einem @Discord-Admin!")
                    console.log(e)
                }

            } else {
                interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");
            
                setTimeout(() => {
                    interaction.channel.bulkDelete(1, true)
                  }, 1000 * 3)
            }
    }

}