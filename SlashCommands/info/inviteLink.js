const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("invitelink")
    .setDescription("Zeigt dir den Discord Server Invite Link!")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${interaction.guild.name}'s Invitelink`)
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")               

        client.guilds.cache.forEach(guild => {
            guild.invites.fetch().then(invites => {
                invites.forEach((invite, index) => {
                    embed.addFields({ name: `${index+1}.`, value: `https://discord.com/invite/${invite.code}` });
                })
            })
        })

        return interaction.followUp({embeds: [embed]});
    }

}