const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/ecoDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Top Spieler")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        const topList = await DB.find({ GuildID: interaction.guild.id }).sort({ Coins: -1 }).limit(9);
        if (!topList) return interaction.followUp(`Es ist aktuell kein Leaderboard verfügbar!`);

        const embed = new Discord.MessageEmbed()
        .setTitle(`📊 ${interaction.guild.name}'s Leaderboard`)
        .setColor(0x00AE86)
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

        let dataArray = [];
        for (const data of topList) {
            dataArray.push({ ID: data.MemberID, Coins: data.Coins.toString(), lvl: data.Level });
        }

        dataArray.forEach((data, index) => {
            const member = interaction.guild.members.cache.get(data.ID);
            
            if (!member) {
                embed.addFields({ name: `${index+1}. "User Left"`, value: `${data.Coins} Coins (Level ${data.lvl})`, inline: true });
            
            } else {
                embed.addFields({ name: `${index+1}. ${member.user.username}`, value: `${data.Coins} Coins (Level ${data.lvl})`, inline: true });
            
            }
        })
        return interaction.followUp({embeds: [embed]});

    },
};