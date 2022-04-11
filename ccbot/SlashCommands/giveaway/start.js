const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const ms = require("ms");
const { notesChannel } = require("../../config.json");
const DB = require("../../schemas/giveawayDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Erstellt ein Giveaway")
    .addChannelOption(option =>
        option
            .setName("chat")
            .setDescription("Der Chat in dem es stattfinden soll")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("gewinn")
            .setDescription("Der Gewinn für das Giveaway")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("zeit")
            .setDescription("Die Zeit für das Giveaway")
            .setRequired(true)
        )
    .addIntegerOption(option =>
        option
            .setName("gewinner")
            .setDescription("Die Anzahl der Gewinner")
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
        if (interaction.member.permissions.has("MANAGE_MESSAGES")) {

        const channel = interaction.options.getChannel("chat");
        const prize = interaction.options.getString("gewinn");
        const time = interaction.options.getString("zeit");
        let winnerCount = interaction.options.getInteger("gewinner");

        if (winnerCount === 0) return interaction.followUp(`Das ist keine gültige Gewinner Anzahl!`);
        winnerCount = Math.round(winnerCount);
        if (!ms(time)) return interaction.followUp(`Das ist keine gültige Zeit!`);

        const date = Math.round(new Date().getTime()/1000.0);
        const endTime = date + (ms(time)/1000);

        try {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Gewinn: ${prize}`)
            .setDescription(`Verlost von: ${interaction.user}\nReagiere mit 🎉 um teilzunehmen!\n\nEndet: <t:${endTime}:R>\nGewinner: ${winnerCount}`)
            .setFooter(`Bot developed by F.O.X.Y`, "")
            .setColor("GREEN")

            const msg = await channel.send({content: "||@everyone||\n😱 **GIVEAWAY** 😱", embeds: [embed]});

            await DB.create({
                HosterID: interaction.member.id,
                MessageID: msg.id,
                ChannelID: channel.id,
                StartAt: date,
                EndAt: endTime,
                Ended: false,
                Prize: prize,
                WinnerCount: winnerCount
            });

            await msg.react("🎉");

            interaction.followUp(`Das Giveaway wurde in ${channel} gestartet!`);

            const embed2 = new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`Giveaway`)
            .setDescription(`${interaction.user} hat ein Giveaway in ${channel} gestartet!` + "\n"+"\n" + "**Preis**" + "\n" + `${prize}` + "\n" + "**Zeit**" + "\n" + `${time}` + "\n" + "**Gewinner**" + "\n" + `${winnerCount}`)
            .setFooter("Bot developed by F.O.X.Y", "")

            client.channels.cache.get(notesChannel).send({embeds: [embed2]}).catch(e => console.log(e));


        } catch (err) {
            console.log(err);
        }

    } else {
        interaction.followUp(`Du bist nicht mein Chef, das kannst du nicht tuen!`);
    
        setTimeout(() => {
         interaction.channel.bulkDelete(1, true);
       }, 1000 * 3)
    }
}
}