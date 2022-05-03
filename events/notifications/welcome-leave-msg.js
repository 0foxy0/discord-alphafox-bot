const client = require("../../index");
const Discord = require("discord.js");
const { notesChannel, welcomeChn, ruleChn, unidentifiedRole } = require("../../config.json");
const generateImage = require("../../welcomeImg");

client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.get(welcomeChn)

  member.roles.add(unidentifiedRole).catch(e => {console.log(e)});
  
  member.send(`Willkommen auf ${member.guild.name}! \n Bestätige die Regeln von **${member.guild.name}** im <#${ruleChn}> Chat!`).catch(e => {

     console.log(e)
  });

  const img = await generateImage(member);

  channel.send({
     content: `Herzlich Willkommen ${member.user} auf **${member.guild.name}**!`,
     files: [img]
  });
})



client.on("guildMemberRemove", async member => {
    const channel = member.guild.channels.cache.get(notesChannel);
       
       const embed = new Discord.MessageEmbed()
       .setColor("RED")
       .setTitle(`${member.user.username}`)
       .setThumbnail(member.user.avatarURL({ dynamic: true }))
       .setDescription(`verlässt ${member.guild.name}!`+ "\n" + "\n" +`Gejoined: ${member.joinedAt.toLocaleString("de", { timeZone: "CET" })}`)
       .setFooter("Bot developed by F.O.X.Y | User left", "https://bilderupload.org/image/813735985-foxy-original.png")
       .setTimestamp()

    channel.send({embeds: [embed]});
})

client.on("guildBanAdd", async ban => {
   const channel = ban.guild.channels.cache.get(notesChannel);
   const member = ban.guild.members.cache.get(ban.user.id);
      
   const embed = new Discord.MessageEmbed()
   .setColor("RED")
   .setTitle(`${ban.user.username}`)
   .setThumbnail(ban.user.avatarURL({ dynamic: true }))
   .setDescription(`wurde von ${ban.guild.name} gebannt!`+ "\n\n" +`Gejoined: ${member.joinedAt.toLocaleString("de", { timeZone: "CET" })}\nGrund: ${ban.reason}`)
   .setFooter("Bot developed by F.O.X.Y | User left", "https://bilderupload.org/image/813735985-foxy-original.png")
   .setTimestamp()

   channel.send({embeds: [embed]});
})