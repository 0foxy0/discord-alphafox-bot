const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/ecoDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("lvlshop")
    .setDescription("Level kaufen um mehr Coins zu bekommen!")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        const found = await DB.findOne({ MemberID: interaction.member.id });
        if (!found) {
            await DB.create({
                GuildID: interaction.guild.id,
                MemberID: interaction.member.id,
                Coins: 0,
                Level: 1
            });
        }

        let prize;
        if (found.Level == 1) prize = 1500;
        if (found.Level == 2) prize = 3000;
        if (found.Level == 3) prize = 4500;
        if (found.Level == 4) prize = 6000;

        if (found.Level == 5) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Level Shop")
            .setColor("GOLD")
            .setDescription(`**Dein aktuelles Level**: ${found.Level}\n**Nächstes Level**: --\n**Preis**: --`)
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("lvlinfo_btn")
                .setEmoji("❔")
                .setLabel("Level Vorteile")
                .setStyle("PRIMARY")
            );

            interaction.followUp({ components: [row], embeds: [embed] });

        } else {

            const embed = new Discord.MessageEmbed()
            .setTitle("Level Shop")
            .setColor("GOLD")
            .setDescription(`**Dein Aktuelles Level**: ${found.Level}\n**Nächstes Level**: ${found.Level + 1}\n**Preis**: ${prize} Coins`)
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");
    
            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("buyLvl_btn")
                .setEmoji("📈")
                .setLabel("Level kaufen")
                .setStyle("SUCCESS"),

                new Discord.MessageButton()
                .setCustomId("lvlinfo_btn")
                .setEmoji("❔")
                .setLabel("Level Vorteile")
                .setStyle("PRIMARY")
            );
    
            interaction.followUp({ components: [row], embeds: [embed] });
        }
    },
};