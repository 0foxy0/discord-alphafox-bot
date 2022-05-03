const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { notesChannel, privateChatCat } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("privatchat")
    .setDescription("Erstellt ein privaten Chat mit der angegebenen Person")
    .addUserOption(option => 
        option
            .setName("spieler")
            .setDescription("Die Person mit der du den Chat öffnen willst")
            .setRequired(true)
        )
    .addStringOption(option => 
        option
            .setName("chatname")
            .setDescription("Der Name des privaten Chats")
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

        const mention = interaction.options.getUser("spieler");
        const name = interaction.options.getString("chatname");
        const target = interaction.guild.members.cache.get(mention.id);

        const embed = new Discord.MessageEmbed()
        .setColor('DEFAULT')
        .setTitle(`Privat Chat`)
        .setDescription(`<@${interaction.user.id}> hat einen Chat mit ${target} erstellt` + '\n\n' + '**Name**' + '\n' + `${name}`)
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
        client.channels.cache.get(notesChannel).send({embeds: [embed]});

        let newChannel = await interaction.guild.channels.create(name, {
            type: 'GUILD_TEXT',
            parent: privateChatCat,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: target,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                }
            ]
        });

        const embed2 = new Discord.MessageEmbed()
        .setColor('GOLD')
        .setTitle(`Privater Chat`)
        .setDescription(`Willkommen <@${interaction.user.id}> in deinem privaten Chat mit ${target}!` + '\n' + '\n' + `Den privaten Chat kannst du mit dem Befehl **/closechat** löschen!`)
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")               
        await newChannel.send({embeds: [embed2]});

        interaction.followUp("Der private Chat wurde erstellt!");
    }

}