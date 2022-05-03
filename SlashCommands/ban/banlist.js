const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("banlist")
    .setDescription("Liste der gebannten Spieler")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has("BAN_MEMBERS")) {

            const fetchBans = await interaction.guild.bans.fetch();

            let embed = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle(`Ban Liste`)
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")

            fetchBans.forEach(ban => {
                embed.addFields({ name: `${ban.user.tag}`, value: `${ban.reason}`, inline: true });
            })

            interaction.followUp({embeds: [embed]});

        } else {
        interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");
    
        setTimeout(() => {
            interaction.channel.bulkDelete(1, true)
          }, 1000 * 3)
    }    

    }

}