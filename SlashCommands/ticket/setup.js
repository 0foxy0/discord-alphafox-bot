const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/ticketOpsDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("setupticket")
    .setDescription("Erstellt die Ticket erstellen Nachricht!")
    .addChannelOption(option => 
        option
            .setName("chat")
            .setDescription("Der Chat wo die Nachricht stehen soll")
            .setRequired(true)
        )
    .addRoleOption(option => 
        option
            .setName("rollesupport")
            .setDescription("Die Rolle die Zugriff auf Support Tickets haben soll!")
            .setRequired(true)
        )
    .addRoleOption(option => 
        option
            .setName("rolleapply")
            .setDescription("Die Rolle die Zugriff auf Bewerbungs Tickets haben soll!")
            .setRequired(true)
        )
    .addRoleOption(option => 
        option
            .setName("rollebug")
            .setDescription("Die Rolle die Zugriff auf Bug Tickets haben soll!")
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

        const channel = interaction.options.getChannel("chat");
        let category;
        const supRole = interaction.options.getRole("rollesupport");
        const applyRole = interaction.options.getRole("rolleapply");
        const bugRole = interaction.options.getRole("rollebug");

        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            interaction.followUp("Du bist nicht mein Chef du kannst das nicht tuen!");
        
            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)
        }
        
        interaction.guild.channels.cache.forEach(chn => {
            if (chn.type == "GUILD_CATEGORY" && !category && chn.name.toLowerCase() == "tickets") {
                category = chn;
            }
        })
        
        if (!category) {
            await interaction.guild.channels.create("tickets", {
                type: "GUILD_CATEGORY",
                PermissionOverwrites: [
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
                    { id: client.user.id, allow: ["VIEW_CHANNEL"] },
                ]
            }).then(l => category = l);
        }

        const found = await DB.findOne({ GuildID: interaction.guild.id });

        if (!found) {
            await DB.create({
                GuildID: interaction.guild.id,
                SupRoleID: supRole.id,
                ApplyRoleID: applyRole.id,
                BugRoleID: bugRole.id
            });
        
        } else {
            await DB.updateOne({ GuildID: interaction.guild.id }, { SupRoleID: supRole.id, ApplyRoleID: applyRole.id, BugRoleID: bugRole.id });
        }
        
        let button = new Discord.MessageButton()
        .setLabel("Support Ticket")
        .setCustomId("support_ticket")
        .setStyle("PRIMARY")
        .setEmoji("🎫");
        
        let button2 = new Discord.MessageButton()
        .setLabel("Bewerbung Ticket")
        .setCustomId("apply_ticket")
        .setStyle("SUCCESS")
        .setEmoji("📬");

        let button3 = new Discord.MessageButton()
        .setLabel("Bug Ticket")
        .setCustomId("bug_ticket")
        .setStyle("DANGER")
        .setEmoji("🐞");
        
        let row = new Discord.MessageActionRow()
        .addComponents([button, button2, button3]);
        
        const embed = new Discord.MessageEmbed()
        .setTitle("Ticket öffnen")
        .setDescription("Du benötigst Hilfe oder hast ein Anliegen?" + "\n" + 
        "Du wirst dann mit den Supportern verbunden!" + "\n" + "\n" +
        "Das Ticket kannst du mit 🎫, 📬 oder 🐞 eröffnen")
        .setColor("GREEN")
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
        
        
        channel.send({embeds: [embed], components: [row]});        
        interaction.followUp(`Die Ticket erstellen Nachricht wurde erfolgreich in ${channel} gesendet!`);
    }
}