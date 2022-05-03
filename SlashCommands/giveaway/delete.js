const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const DB = require("../../schemas/giveawayDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("delgiveaway")
    .setDescription("Löscht ein Giveaway")
    .addStringOption(option =>
        option
            .setName("id")
            .setDescription("Die ID der Giveaway Nachricht")
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

        const giveawayID = interaction.options.getString("id");
        
        const found = await DB.findOne({ MessageID: giveawayID });
        if (!found) return interaction.followUp(`Das Giveaway "${giveawayID}" existiert nicht!`);

        const channel = client.channels.cache.get(found.ChannelID);
        if (!channel) return interaction.followUp(`Der gespeicherte Channel kann nicht gefunden werden!`);
        const msg = await channel.messages.fetch(found.MessageID);
        if (!msg) return interaction.followUp(`Die Nachricht des Giveaways konnte nicht gefunden werden!`);

        msg.delete();
        await DB.deleteOne({ MessageID: giveawayID });
        interaction.followUp(`Das Giveaway "${giveawayID}" wurde erfolgreich gelöscht!`);

    } else {
        interaction.followUp(`Du bist nicht mein Chef, das kannst du nicht tun!`);
    
        setTimeout(() => {
         interaction.channel.bulkDelete(1, true)
       }, 1000 * 3)
     }
    

    }
    
}