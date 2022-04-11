const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/levelDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Zeigt dir dein/sein Rang")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Wenn gewollt der Spieler dessen Rang gezeigt werden soll")
            .setRequired(false)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        const mention = interaction.options.getMember("spieler");

        if (mention) {
            const found = await DB.findOne({ MemberID: mention.id });
            if (!found) {
                DB.create({
                    GuildID: interaction.guild.id,
                    MemberID: mention.id,
                    XP: 0,
                    Level: 1,
                    ReqXP: 100
                })

                interaction.followUp(`${mention} hatte noch keine Stats! Die Stats wurden jetzt erstellt!`);
                return;
            }

            let embed = new Discord.MessageEmbed()
            .setTitle(`**Stats Karte**`)
            .setColor("RANDOM")
            .setDescription(`${mention}`)
            .addFields(
                {name: "Level:", value: found.Level},
                {name: "XP:", value: found.XP.toString() + "/"+ found.ReqXP},
                {name: "XP bis zum nächsten Level:", value: (parseInt(found.ReqXP) - found.XP).toString()}
                )
            .setThumbnail('')
            .setFooter("Bot developed by F.O.X.Y", "")
            interaction.followUp({embeds: [embed]});

        } else {
            const found = await DB.findOne({ MemberID: interaction.user.id });
            if (!found) {
                DB.create({
                    GuildID: interaction.guild.id,
                    MemberID: interaction.user.id,
                    XP: 0,
                    Level: 1,
                    ReqXP: 100
                })

                interaction.followUp(`Du hattest noch keine Stats! Die Stats wurden jetzt erstellt!`);
                return;
            }

            let embed = new Discord.MessageEmbed()
            .setTitle(`**Stats Karte**`)
            .setColor("RANDOM")
            .setDescription(`${interaction.user}`)
            .addFields(
                {name: "Level:", value: found.Level},
                {name: "XP:", value: found.XP.toString() + "/"+ found.ReqXP},
                {name: "XP bis zum nächsten Level:", value: (parseInt(found.ReqXP) - found.XP).toString()}
                )
            .setThumbnail('')
            .setFooter("Bot developed by F.O.X.Y", "")
            interaction.followUp({embeds: [embed]});
        }
    
    },
};