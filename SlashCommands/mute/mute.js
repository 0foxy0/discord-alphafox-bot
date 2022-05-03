const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const ms = require("ms");
const { notesChannel } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Stummt einen Spieler")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Der Spieler der gestummt werden soll")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("zeit")
            .setDescription("Die Länge des Mutes")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("grund")
            .setDescription("Der Grund des Mutes")
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
        const time = interaction.options.getString("zeit");
        const reason = interaction.options.getString("grund");

        const timeInMs = ms(time);
        if (!timeInMs) return interaction.followUp("Gib eine gültige Zeit an!");
        
        if (user.isCommunicationDisabled(true)) {
            interaction.followUp("Der Spieler ist bereits gestummt!")
        
        } else {
            if (user.roles.highest.position >= client.roles.highest.position) return interaction.followUp(`Der Spieler ${user} kann nicht gemutet werden!`);

            user.timeout(timeInMs, reason);
            interaction.followUp(`${user} wurde erfolgreich für ${time} gestummt!`);

            const embed = new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`MUTE`)
            .setDescription(`${interaction.user} stummt ${user}` + '\n' + '**Dauer**' + '\n' + `${time}`+'\n**Grund**' + '\n' + `${reason}`)
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")

            client.channels.cache.find(channel => channel.id === notesChannel).send({embeds: [embed]}).catch(e => console.log(e));
        }
        
    } else {
        interaction.followUp(`${interaction.user}` + "Du bist nicht mein Chef, das kannst du nicht tun!");
        
        setTimeout(() => {
            interaction.channel.bulkDelete(1, true)
          }, 1000 * 3)
    }

    }

}