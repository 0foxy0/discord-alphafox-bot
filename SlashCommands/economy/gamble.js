const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/ecoDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("gamble")
    .setDescription("Du kannst dein Geld aufs Spiel setzen!")
    .addIntegerOption(option => 
        option
            .setName("coins")
            .setDescription("Wie viele Coins du aufs Spiel setzen möchtest!")
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

        const coinsTG = interaction.options.getInteger("coins");
        const found = await DB.findOne({ MemberID: interaction.member.id });

        if (!found) {
            await DB.create({
                GuildID: interaction.guild.id,
                MemberID: interaction.member.id,
                Coins: 0,
                Level: 1
            });
        }
        if (found.Coins == 0) return interaction.followUp(`Du hast **keine** Coins!`);
        if (coinsTG > found.Coins) return interaction.followUp(`Du hast **nicht genügend** Coins!\nNutze **/coins** umzu sehen wie viele Coins du hast!`);

        let win = false;
        const newCoinsWin = (found.Coins - coinsTG) + (coinsTG * 2);
        const newCoinsLose = found.Coins - coinsTG;
        let randomNum = Math.random() * 10 + 1;
        
        if (found.Level <= 3) {
            if (randomNum > 5) win = false;
            if (randomNum <= 5) win = true;
        
        } else if (found.Level == 4) {
            if (randomNum > 6) win = false;
            if (randomNum <= 6) win = true;
        
        } else if (found.Level == 5) {
            if (randomNum > 6.5) win = false;
            if (randomNum <= 6.5) win = true;
        };

        const embed = new Discord.MessageEmbed()
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

        if (win) {
            await DB.updateOne({ MemberID: interaction.member.id }, { Coins: newCoinsWin });
            interaction.followUp({ embeds: [embed.setTitle("🎉 Gewonnen").setColor("GREEN").setDescription(`**Gewettete Coins**: ${coinsTG}\n**Deine Coins**: ${newCoinsWin}`)] });                

        } else if (!win) {
            await DB.updateOne({ MemberID: interaction.member.id }, { Coins: newCoinsLose });
            interaction.followUp({ embeds: [embed.setTitle("❌ Verloren").setColor("RED").setDescription(`**Gewettete Coins**: ${coinsTG}\n**Deine Coins**: ${newCoinsLose}`)] });

        }

    },
};