const client = require("../../index");
const Discord = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const DB = require("../../schemas/ticketDB");
const { notesChannel } = require("../../config.json");

client.on("interactionCreate", async interaction => {

    const embed = new Discord.MessageEmbed()
    .setColor("YELLOW");

    const embedC = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle(`Ticket Geschlossen`)
    .setFooter('F.O.X.Y | Geschlossen am', 'https://bilderupload.org/image/813735985-foxy-original.png')
    .setTimestamp();

    const embedQ = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Ticket schließen?`)
    .setFooter(`Bot developed by F.O.X.Y`, "https://bilderupload.org/image/813735985-foxy-original.png");

    let row = new Discord.MessageActionRow()
    .addComponents(

        new Discord.MessageButton()
        .setLabel("Ticket schließen")
        .setCustomId("confirm_close_ticket")
        .setStyle("DANGER")
        .setEmoji("🔒"),

        new Discord.MessageButton()
        .setLabel("Unlock")
        .setCustomId("unlock_ticket")
        .setStyle("SECONDARY")
        .setEmoji("✔️")
    );


    if (!["close_ticket", "lock_ticket", "unlock_ticket", "confirm_close_ticket"].includes(interaction.customId)) return;


    DB.findOne({ ChannelID: interaction.channel.id }, async (err, docs) => {
        if (err) throw err;
        if (!docs) return interaction.reply({content: "Es wurden keine Daten zu diesem Ticket gefunden bitte schließe das Ticket manuell!",
        ephemeral: true,
    });
    switch (interaction.customId) {

    case "lock_ticket":
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Du bist nicht berechtigt das zu tuen!",
        ephemeral: true});
            
        if (docs.Locked == true)
            return interaction.reply({content: "Das Ticket ist bereits gelocked!",
            ephemeral: true
    });

    await DB.updateOne({ ChannelID: interaction.channel.id }, { Locked: true });
    embed.setDescription("Das Ticket ist jetzt gelocked und wird überprüft!");
    return interaction.reply({ embeds: [embed] });
    break;

    case "unlock_ticket":
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Du bist nicht berechtigt das zu tuen!",
        ephemeral: true});
        
        if (docs.Locked == false)
            return interaction.reply({content: "Das Ticket ist bereits freigegeben!",
            ephemeral: true
    });

    await DB.updateOne({ ChannelID: interaction.channel.id }, { Locked: false });
    embed.setDescription("Das Ticket ist jetzt wieder freigegeben!");
    return interaction.reply({ embeds: [embed] });
    break;

    case "close_ticket":
        if (docs.Closed == true)
        return interaction.reply({ content: "Das Ticket ist bereits geschlossen! Sollte es sich nicht schließen, melde das bitte einem @Discord-Admin!",
        ephemeral: true});

    if (docs.Locked === true && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Das Ticket ist gelocked du kannst es jetzt nicht schließen!",
    ephemeral: true}), interaction.channel.send({embeds: [embedQ.setDescription(`${interaction.user} möchte das Ticket schließen!`)], components: [row]});

    let name = "";
    const member = interaction.guild.members.cache.get(docs.MemberID);
    if (!member) name = "userLeft";
    if (member) name = `${member.user.username}`;

    const attachment = await createTranscript(interaction.channel, {
        limit: -1,
        returnBuffer: false,
        fileName: `${name}.html`,
        });
        await DB.updateOne({ ChannelID: interaction.channel.id }, { Closed: true });

        let type;

        if (docs.Type === "apply_ticket") {
            type = "Bewerbung";

        } else if (docs.Type === "support_ticket") {
            type = "Support";

        } else if (docs.Type === "bug_ticket") {
            type = "Bug";

        }

        await interaction.guild.channels.cache.get(notesChannel).send({embeds: [
            embedC.addFields(
            {name: `Ticket Typ`, value: `${type}`, inline: true},
            {name: `Ticket geöffnet von`, value: `<@${docs.MemberID}>`, inline: true},
            {name: `Ticket geschlossen von`, value: `<@${interaction.user.id}>`, inline: true},
            {name: `Ticket geöffnet am`, value: `${interaction.channel.createdAt.toLocaleString('de', { timeZone: 'CET' })}`, inline: true},
        )], 
    files: [attachment],
    });
    interaction.channel.send('@here' + '\n' + interaction.user.username + ' schließt das Ticket in 15 Sekunden!');
    setTimeout(() => {
        interaction.channel.delete().catch(e => {console.log(e); interaction.channel.send('@here' + '\n' + 'Das Ticket konnte nicht geschlossen werden versuche es erneut und kontaktiere einen @Discord-Admin')});
    }, 1000 * 15)
    break;

    
    case "confirm_close_ticket":
        if (docs.Closed == true)
        return interaction.reply({ content: "Das Ticket ist bereits geschlossen! Sollte es sich nicht schließen, melde das bitte einem @Discord-Admin!",
        ephemeral: true});

        if (docs.Locked === true && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Das Ticket ist gelocked du kannst es jetzt nicht schließen!",
        ephemeral: true}), interaction.channel.send({embeds: [embedQ.setDescription(`${interaction.user} möchte das Ticket schließen!`)], components: [row]});

        let name2 = "";
        const member2 = interaction.guild.members.cache.get(docs.MemberID);
        if (!member2) name2 = "userLeft";
        if (member2) name2 = `${member2.user.username}`;

    const attachment2 = await createTranscript(interaction.channel, {
        limit: -1,
        returnBuffer: false,
        fileName: `${name2}.html`,
        });
        await DB.updateOne({ ChannelID: interaction.channel.id }, { Closed: true });

        let type2;

        if (docs.Type === "apply_ticket") {
            type2 = "Bewerbung";

        } else if (docs.Type === "support_ticket") {
            type2 = "Support";

        } else if (docs.Type === "bug_ticket") {
            type2 = "Bug";

        }

        await interaction.guild.channels.cache.get(notesChannel).send({embeds: [
            embedC.addFields(
            {name: `Ticket Typ`, value: `${type2}`, inline: true},
            {name: `Ticket geöffnet von`, value: `<@${docs.MemberID}>`, inline: true},
            {name: `Ticket geschlossen von`, value: `<@${interaction.user.id}>`, inline: true},
            {name: `Ticket geöffnet am`, value: `${interaction.channel.createdAt.toLocaleString('de', { timeZone: 'CET' })}`, inline: true},
        )], 
    files: [attachment2],
    });
    interaction.channel.send('@here' + '\n' + interaction.user.username + ' schließt das Ticket in 15 Sekunden!');
    setTimeout(() => {
        interaction.channel.delete().catch(e => {console.log(e); interaction.channel.send('@here' + '\n' + 'Das Ticket konnte nicht geschlossen werden versuche es erneut und kontaktiere einen @Discord-Admin')});
    }, 1000 * 15)
    break;

    }
    });

})