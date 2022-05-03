const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const DB = require("../../schemas/tempChnDB");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("voicelimit")
    .setDescription("Limitiert die Anzahl der Spieler die in deinen Channel dürfen!")
    .addIntegerOption(option => 
        option
            .setName("anzahl")
            .setDescription("Die Anzahl der Spieler")
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

        if (interaction.member.voice.channel) {


            DB.findOne({ MemberID: interaction.user.id }, async (err, docs) => {

                if (interaction.member.voice.channel.id === docs.ChannelID) {
            
                    let number = interaction.options.getInteger("anzahl");

                    const theChannel = interaction.guild.channels.cache.get(docs.ChannelID);

                    theChannel.setUserLimit(number).then(
                        await DB.updateOne({ MemberID: interaction.user.id }, { UserLimit: number.toString() })
                    );

                    interaction.followUp(`Die Anzahl der Spieler die in den Channel dürfen wurde auf ${number.toString()} geändert!`);
        
                } else {
                    interaction.followUp("Du bist nicht in deinem oder in einem Temp. Channel!");
        
                    setTimeout(() => {
                        interaction.channel.bulkDelete(1, true)
                    }, 1000 * 3)
                }
    
            })


        } else {
            interaction.followUp("Du bist in keinem Channel!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true)
              }, 1000 * 3)
        }
    
    },
};