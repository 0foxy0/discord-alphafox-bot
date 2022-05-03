const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { notesChannel } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannt einen Spieler")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Der Spieler der gebannt werden soll!")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("grund")
            .setDescription("Der Grund des Bans!")
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
            const member = interaction.options.getUser("spieler");
            const reason = interaction.options.getString("grund");

            if (member) {
                const target = interaction.guild.members.cache.get(member.id);

                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`BAN`)
                .setDescription(`${interaction.user} bannt ${target}` + "\n" + "**Grund**" + "\n" + `${reason}`)
                .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
                client.channels.cache.find(channel => channel.id === notesChannel).send({embeds: [embed]}).catch(e => {console.log(e)});

                try {
                    await target.send(`Du wurdest von **${interaction.guild.name}** gebannt!` + "\n" + "**Grund**: " + reason)
                } catch (e) {
                    interaction.followUp("Die DM konnte nicht an den Spieler gesendet werden!" + "\n" + "Warum? Frage einen @Discord-Admin")
                    console.log(e)
                }

                await target.ban({ reason });
                
            } else return interaction.followUp("Der Spieler konnte nicht gefunden werden!");

            }else {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");

            setTimeout(() => {
                interaction.channel.bulkDelete(parseInt(1), true)
              }, 1000 * 3)
            }


        }

    }