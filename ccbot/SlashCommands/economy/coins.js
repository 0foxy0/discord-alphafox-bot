const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/ecoDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("coins")
    .setDescription("Zeigt dir deine/seine Coins")
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
            if (mention.user.bot) return interaction.followUp("Bots haben keine Economy Daten!");

            const found = await DB.findOne({ MemberID: mention.id });
            if (!found) {
                DB.create({
                    GuildID: interaction.guild.id,
                    MemberID: mention.id,
                    Coins: 0,
                    Level: 1
                })

                interaction.followUp(`${mention} hatte noch keine Coins! Die Daten wurden jetzt erstellt!`);
                return;
            }

            let embed = new Discord.MessageEmbed()
            .setTitle(`**Coins Info**`)
            .setColor("RANDOM")
            .setDescription(`${mention}`)
            .addFields(
                {name: "Level:", value: found.Level.toString(), inline: true},
                {name: "Coins:", value: found.Coins.toString(), inline: true}
                )
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
            interaction.followUp({embeds: [embed]});

        } else {
            if (interaction.user.bot) return interaction.followUp("Bots haben keine Economy Daten!");

            const found = await DB.findOne({ MemberID: interaction.user.id });
            if (!found) {
                DB.create({
                    GuildID: interaction.guild.id,
                    MemberID: interaction.user.id,
                    Coins: 0,
                    Level: 1
                })

                interaction.followUp(`Du hattest noch keine Coins! Die Daten wurden jetzt erstellt!`);
                return;
            }

            const embed = new Discord.MessageEmbed()
            .setTitle(`**Coins Info**`)
            .setColor("RANDOM")
            .setDescription(`${interaction.user}`)
            .addFields(
                {name: "Level:", value: found.Level.toString(), inline: true},
                {name: "Coins:", value: found.Coins.toString(), inline: true}
                )
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("gamble_btn")
                .setEmoji("🎰")
                .setLabel("Gamble all")
                .setStyle("DANGER"),

                new Discord.MessageButton()
                .setCustomId("buyLvl_btn")
                .setEmoji("📈")
                .setLabel("Level kaufen")
                .setStyle("SUCCESS")
            )

            interaction.followUp({components: [row], embeds: [embed]});
        }
    
    },
};