const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const DB = require("../../schemas/giveawayDB");
const Discord = require("discord.js");
const { notesChannel } = require("../../config.json");
const ms = require("ms");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("editgiveaway")
    .setDescription("Bearbeitet das Giveaway!")
    .addStringOption(option =>
        option
            .setName("id")
            .setDescription("Die ID der Giveaway Nachricht")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("neuergewinn")
            .setDescription("Der neue Gewinn des Giveaways!")
            .setRequired(true)
        )
    .addIntegerOption(option =>
        option
            .setName("neuegewinner")
            .setDescription("Die neue Gewinner Anzahl!")
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName("zeit")
            .setDescription("Die Zeit die auf die aktuelle Zeit gepackt wird")
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
        if (interaction.member.permissions.has("MANAGE_MESSAGES")) {

        const giveawayID = interaction.options.getString("id");
        const newPrize = interaction.options.getString("neuergewinn");
        const newWinners = interaction.options.getInteger("neuegewinner");
        let plusTime = interaction.options.getString("zeit");

        if(!plusTime) plusTime = "0s";

        const found = await DB.findOne({ MessageID: giveawayID });
        if (!found) return interaction.followUp(`Das Giveaway "${giveawayID}" existiert nicht!`);
        if (found.Ended === true) return interaction.followUp(`Das Giveaway "${giveawayID}" ist schon beendet!`);
        const channel = client.channels.cache.get(found.ChannelID);
        if (!channel) return interaction.followUp(`Der gespeicherte Channel kann nicht gefunden werden!`);
        const msg = await channel.messages.fetch(found.MessageID);
        if (!msg) return interaction.followUp(`Die Nachricht des Giveaways konnte nicht gefunden werden!`);

        const addedTime = found.EndAt + (ms(plusTime)/1000);
        await DB.updateOne({ MessageID: giveawayID }, { Prize: newPrize, WinnerCount: newWinners, EndAt: addedTime }, {new: true});

        const embed = new Discord.MessageEmbed()
        .setTitle(`Gewinn: ${newPrize}`)
        .setDescription(`Verlost von: <@${found.HosterID}>\nReagiere mit 🎉 um teilzunehmen!\n\nEndet: <t:${addedTime}:R>\nGewinner: ${newWinners}`)
        .setFooter(`Bot developed by F.O.X.Y`, "https://bilderupload.org/image/813735985-foxy-original.png")
        .setColor("GREEN")

        msg.edit({content: "||@everyone||\n😱 **GIVEAWAY** 😱", embeds: [embed]});

        const embed2 = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setTitle(`Giveaway Edit`)
        .setDescription(`${interaction.user} hat das Giveaway "${giveawayID}" bearbeitet!` + "\n"+"\n" + "**Neuer Preis**" + "\n" + `${newPrize}` + "\n" + "**Hinzugefügte Zeit**" + "\n" + `${plusTime}` + "\n" + "**Gewinner Anzahl**" + "\n" + `${newWinners}`)
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
        client.channels.cache.get(notesChannel).send({embeds: [embed2]});

        interaction.followUp(`Das Giveaway "${giveawayID}" wurde erfolgreich editiert!`);

    } else {
        interaction.followUp(`Du bist nicht mein Chef, das kannst du nicht tun!`);
    
        setTimeout(() => {
         interaction.channel.bulkDelete(1, true)
       }, 1000 * 3)
     }
    

    }
    
}