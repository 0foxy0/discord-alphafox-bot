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
            const bannedMembers = (await fetchBans)
            .map((member) => member.user.tag)
            .join("\n");

            let embed = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle(`BANLIST`)
            .setDescription(`${bannedMembers}`)
            .setFooter("Bot developed by F.O.X.Y", "")
            interaction.followUp({embeds: [embed]});

        }else {
        interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");
    
        setTimeout(() => {
            interaction.channel.bulkDelete(parseInt(1), true)
          }, 1000 * 3)
    }    

    }

}