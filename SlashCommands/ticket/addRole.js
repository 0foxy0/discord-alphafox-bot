const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("fügt eine Rolle dem Ticket hinzu!")
    .addRoleOption(option => 
        option
            .setName("rolle")
            .setDescription("Die Rolle die hinzugefügt werden soll!")
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

        let mentionedRole = interaction.options.getRole("rolle");

        let kate;

        interaction.guild.channels.cache.forEach(chn => {
        if (chn.type == 'GUILD_CATEGORY' && !kate && chn.name.toLowerCase() == 'tickets') {
            kate = chn;
        }
        })

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            interaction.followUp("Du bist nicht mein Chef, das kannst du nicht tun!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)

        } else if (interaction.channel.parent !== kate) {
            interaction.followUp("Du kannst diesen Befehl nur in Tickets nutzen!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)

        } else {
            interaction.channel.permissionOverwrites.edit(mentionedRole, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
    
            }).then(
                interaction.followUp(`Die Rolle ${mentionedRole} wurde zum Ticket hinzugefügt!`)
            ).catch(e => {console.log(e)});
        }
    },
};