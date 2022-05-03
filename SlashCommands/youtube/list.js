const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const DB = require("../../schemas/youtubeDB");
const fetch = require("node-superfetch");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("creatorlist")
    .setDescription("Liste der Creator die eine Benachrichtigung haben!")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

            const creatorList = await DB.find({ ID: "youtube" });

            if (!creatorList) return interaction.followUp(`Es ist kein Eintrag in der Liste!`);

            const embed = new Discord.MessageEmbed()
            .setTitle("Creator Liste")
            .setColor("RED")
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")

            for (const data of creatorList) {

                const product = await fetch.get(`https://decapi.me/youtube/latest_video?id=${data.CreatorID}`);
                const link = product.body.toString().split("- https://youtu.be/");

                embed.addFields({name: `${data.Creator}`, value: `https://youtu.be/${link[1]}`})
                
            }
            return interaction.followUp({embeds: [embed]});

        } else {
            interaction.followUp("Du bist nicht mein Chef du kannst das nicht tuen!");

            setTimeout(() => {
                interaction.channel.bulkDelete(1, true);
              }, 1000 * 3)
        }
    
    },
};