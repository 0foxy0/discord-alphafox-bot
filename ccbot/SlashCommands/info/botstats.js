const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { version, dependencies } = require("../../package.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("botstats")
    .setDescription("Zeigt dir die Stats des Bots!")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        if (interaction.member.permissions.has("ADMINISTRATOR")) {
        
            const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}'s Stats`)
            .addFields(
                {name: "🏓Ping", value: "└ `"+client.ws.ping+"ms`", inline: true},
                {name: "🤖Version", value: "└ `v"+version+"`", inline: true},
                {name: "📙Discord.js", value: "└ `v"+dependencies["discord.js"]+"`", inline: true},
                {name: "📗Node.js", value: "└ `"+process.version+"`", inline: true},
                {name: "🛰Server", value: "└ `"+interaction.guild.name+"`", inline: true}
            )
            .setColor("RED")
            .setFooter("Bot developed by F.O.X.Y", "")
            .setThumbnail(client.user.avatarURL({ dynamic: true }))

            await interaction.followUp({embeds: [embed]});

        } else {
            interaction.followUp("Du bist nicht mein Chef du kannst das nicht tuen!");
        
            setTimeout(() => {
                interaction.channel.bulkDelete(parseInt(1), true)
              }, 1000 * 3)

        }
    },
};