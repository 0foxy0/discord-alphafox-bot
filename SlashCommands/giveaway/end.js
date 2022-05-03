const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const DB = require("../../schemas/giveawayDB");
const Discord = require("discord.js");
const { notesChannel } = require("../../config.json");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("endgiveaway")
    .setDescription("Beendet ein Giveaway sofort!")
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
        if (found.Ended === true) return interaction.followUp(`Das Giveaway "${giveawayID}" ist bereist beendet!`);
        const channel = client.channels.cache.get(found.ChannelID);
        if (!channel) return interaction.followUp(`Der gespeicherte Channel kann nicht gefunden werden!`);
        const msg = await channel.messages.fetch(found.MessageID);
        if (!msg) return interaction.followUp(`Die Nachricht des Giveaways konnte nicht gefunden werden!`);

        const reaction = msg.reactions.cache.get("🎉");
        reaction.users.fetch().then(async users => {

            let participants = [];

            users.forEach(user => {
                const member = channel.guild.members.cache.get(user.id);
                if (member.user.bot) return;
                if (member.permissions.has("ADMINISTRATOR") || member.permissions.has("MANAGE_MESSAGES")
                    || member.permissions.has("BAN_MEMBERS")) return;

                participants.push(user.id);
            });

            const embed = new Discord.MessageEmbed()
            .setTitle(`Gewinn: ${found.Prize}`)
            .setColor("NOT_QUITE_BLACK")
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
            .setTimestamp();

            if (participants.length === 0) return (
                msg.edit({content: "❌ **GIVEAWAY BEENDET** ❌", embeds: [embed.setDescription(`**ERROR**: Keine Teilnehmer!`)]})
                .then(await DB.updateOne({ MessageID: giveawayID }, { Ended: true }, { new: true }), interaction.followUp(`**ERROR**: Keine Teilnehmer!`))
            );

            if (found.WinnerCount > participants.length) return (
                msg.edit({content: "❌ **GIVEAWAY BEENDET** ❌", embeds: [embed.setDescription(`**ERROR**: Zu wenige Teilnehmer!`)]})
                .then(await DB.updateOne({ MessageID: giveawayID }, { Ended: true }, { new: true }), interaction.followUp(`**ERROR**: Zu wenige Teilnehmer!`))
            );

            const winners = [];

            for(let i=0; i < found.WinnerCount; i++) {
                winners.push(participants[Math.floor(Math.random()*participants.length)]);

                let double = false;

                for (let j=0; j<i; j++) {

                    if (winners[j] === winners[i]) {
                        double = true;
                        break;
                    }
                }

                if (double) {
                    winners.pop();
                    i--;
                }
            }

            if (!winners) return;

            let winnerMSG = ``;
            winners.forEach(winner => {

                winnerMSG += `<@${winner}> `;
            });
        
            msg.edit({content: "❌ **GIVEAWAY BEENDET** ❌", embeds: [embed.setDescription(`Verlost von: <@${found.HosterID}>\nGewinner: ${winnerMSG}`)]});
            await channel.send(`Herzlichen Glückwunsch ${winnerMSG}!\nGewonnener Preis: **${found.Prize}**`);

            await DB.updateOne({ MessageID: giveawayID }, { Ended: true, WinnerID: winners }, { new: true });

            const embed2 = new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`Giveaway beendet`)
            .setDescription(`${interaction.user} hat das Giveaway "${giveawayID}" frühzeitig beendet!`)
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
            client.channels.cache.get(notesChannel).send({embeds: [embed2]});

            interaction.followUp(`Das Giveaway "${giveawayID}" wurde erfolgreich beendet!`);
        })

    } else {
        interaction.followUp(`Du bist nicht mein Chef, das kannst du nicht tun!`);
    
        setTimeout(() => {
         interaction.channel.bulkDelete(1, true)
       }, 1000 * 3)
     }
    

    }
    
}