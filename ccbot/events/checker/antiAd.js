const client = require("../../index");
const Discord = require("discord.js");
const ms = require("ms");
const { notesChannel } = require("../../config.json");


    // EINLADUNGS LINKS
    client.on("messageCreate", async message => {
        
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        
        if (message.content.toString().includes("discord.gg") || message.content.toString().includes("discord.com/invite")) {
          if (message.content.toString().includes("discord.gg/5aHJvjJqN5") || message.content.toString().includes("discord.com/invite/5aHJvjJqN5")) return;
  
            const notesChannel2 = message.guild.channels.cache.get(notesChannel);
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle(`Gelöschte Einladung`)
              .setDescription(`Von <@${message.author.id}> in <#${message.channel.id}>` + "\n" + "**Link**" + "\n" + `${message.content}`)
              .setFooter("Bot developed by F.O.X.Y", "")
              notesChannel2.send({embeds: [embed]}).catch(e => {console.log(e)});
                
            message.delete();
            message.channel.send(`<@${message.author.id}>` + " es wird hier keine Werbung gemacht!" + "\n" + "Du wurdest für 1 Tag gestummt!");
            message.member.timeout(ms("1d"), "Discord Invite Link");
        }
      }
  
        // LINKS
        if (!message.member.permissions.has("ADMINISTRATOR")) {
          if (!message.content.toString().includes("tenor.com")) {
  
            
          if (message.content.toString().includes("http://") || (message.content.toString().includes("https://") || message.content.toString().includes("www."))) {
              
              const notesChannel2 = message.guild.channels.cache.get(notesChannel);
                
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle(`Gelöschter Link`)
              .setDescription(`Von <@${message.author.id}> in <#${message.channel.id}>` + "\n" + "**Link**" + "\n" + `${message.content}`)
              .setFooter("Bot developed by F.O.X.Y", "")
              notesChannel2.send({embeds: [embed]}).catch(e => {console.log(e)});
              
            message.delete();
            message.channel.send(`<@${message.author.id}>` + " du darfst keine Links senden!");
          }
        }
        }
  
      })
  
  
  
      // BLACKLIST WÖRTER
      client.on("messageCreate", async msg => {
  
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
            
            let blacklist = 
          [
            "huan", "nazi", "spast", "huso",
            "vollspast", "schwanz","penis", "hurensohn",
            "hurentochter", "krüppel", "hundesohn", "arschloch",
            "arschkind", "arschgeburt", "misgeburt", "missgeburt",
            "missgeburten", "motherfucker", "nigga", "nigger",
            "fucker", "fuck", "bullshit", "dumbass", "hoe", "ficken"
          ];
            
            let foundInText = false;
            for (var i in blacklist) {
                if (msg.content.toLowerCase().toString().includes(blacklist[i].toLowerCase().toString())) foundInText = true;
            }
    
            const { member } = msg;
            
            if (foundInText === true) {
                const notesChannel2 = msg.guild.channels.cache.get(notesChannel);

                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Gelöschte Nachricht`)
                .setDescription(`Von <@${msg.author.id}> in <#${msg.channel.id}>` + "\n" + "**Nachricht**" + "\n" + `${msg.content}`)
                .setFooter("Bot developed by F.O.X.Y", "")
                notesChannel2.send({embeds: [embed]}).catch(e => {console.log(e)});
    
                msg.delete();
                msg.channel.send(`<@${msg.author.id}>` + " achte auf deine Wortwahl!" + "\n" + "Du wurdest für 1 Tag gemuted");

                member.timeout(ms("1d"), "Blacklist Wort");
            }
            }
        }
        )