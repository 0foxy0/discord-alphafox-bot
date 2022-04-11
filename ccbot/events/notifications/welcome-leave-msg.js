const client = require("../../index");
const Discord = require("discord.js");
const welcomeChannel = "824731706454966282";
const { notesChannel } = require("../../config.json");
const ruleChannel = "802162292766277643";
const unidentified = "869195642596126771";
const generateImage = require("../../welcomeImg");


client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.get(welcomeChannel)

  member.roles.add(unidentified).catch(e => {console.log(e)});
  
  member.send(`Willkommen auf ${member.guild.name}! \n Bestätige die Regeln von **${member.guild.name}** im <#${ruleChannel}> Chat!`).catch(e => {

     console.log(e)
  });

  const img = await generateImage(member);

  channel.send({
     content: `Herzlich Willkommen ${member.user} auf **${member.guild.name}**!`,
     files: [img]
  });
})



client.on("guildMemberRemove", async member => {
    const channel = member.guild.channels.cache.get(notesChannel)
       
       const embed = new Discord.MessageEmbed()
       .setColor("RED")
       .setTitle(`${member.user.username}`)
       .setThumbnail(member.user.avatarURL({ dynamic: true }))
       .setDescription(`verlässt ${member.guild.name}!`+ "\n" + "\n" +`Gejoined: ${member.joinedAt.toLocaleString("de", { timeZone: "CET" })}`)
       .setFooter("Bot developed by F.O.X.Y | User left", "")
       .setTimestamp()

    channel.send({embeds: [embed]});
})