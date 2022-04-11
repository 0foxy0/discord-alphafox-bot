const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/levelDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Top 10 Level der Spieler")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        const topList = await DB.find({ GuildID: interaction.guild.id }).sort({ XP: -1 }).limit(9);
        if (!topList) return interaction.followUp(`Es ist aktuell kein Leaderboard verfügbar!`);

        const embed = new Discord.MessageEmbed()
        .setTitle("📊 CityCrafting's Leaderboard")
        .setColor(0x00AE86)
        .setThumbnail('')
        .setFooter("Bot developed by F.O.X.Y", "");

        let dataArray = [];
        for (const data of topList) {
            dataArray.push({ ID: data.MemberID, XP: data.XP.toString(), lvl: data.Level });
        }

        dataArray.forEach((data, index) => {
            const member = interaction.guild.members.cache.get(data.ID);
            
            if (!member) {
                embed.addFields({ name: `${index+1}. "User Left"`, value: `${data.XP}XP (Level ${data.lvl})`, inline: true });
            
            } else {
                embed.addFields({ name: `${index+1}. ${member.user.username}`, value: `${data.XP}XP (Level ${data.lvl})`, inline: true });
            }
        })
        return interaction.followUp({embeds: [embed]});

    },
};