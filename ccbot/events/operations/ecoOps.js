const client = require("../../index");
const DB = require("../../schemas/ecoDB");
const Discord = require("discord.js");

client.on("interactionCreate", async interaction => {

    if (!["gamble_btn", "buyLvl_btn", "lvlinfo_btn"].includes(interaction.customId)) return;

    const found = await DB.findOne({ MemberID: interaction.member.id });
    if (!found) {
        await DB.create({
            GuildID: interaction.guild.id,
            MemberID: interaction.member.id,
            Coins: 0,
            Level: 1
        });
    }

    switch (interaction.customId) {

        case "buyLvl_btn":
            if (found.Level == 5) return interaction.reply({ content: `Level 5 ist das höchste Level!`, ephemeral: true });
            let lvlAtm = found.Level;
            let CoinsAtm = found.Coins;

            if (lvlAtm == 1) {
                if (found.Coins < 1500) return interaction.reply({ content: `Du hast nicht genügend Coins!\nDu brauchst **1500 Coins** um **Level 2** zu kaufen!`, ephemeral: true });
                await DB.updateOne({ MemberID: interaction.member.id }, { Coins: CoinsAtm - 1500, Level: lvlAtm + 1 });
                interaction.reply({ content: `Du hast erfolgreich **Level 2** gekauft!`, ephemeral: true });                

            } else if (lvlAtm == 2) {
                if (found.Coins < 3000) return interaction.reply({ content: `Du hast nicht genügend Coins!\nDu brauchst **3000 Coins** um **Level 3** zu kaufen!`, ephemeral: true });
                await DB.updateOne({ MemberID: interaction.member.id }, { Coins: CoinsAtm - 3000, Level: lvlAtm + 1 });
                interaction.reply({ content: `Du hast erfolgreich **Level 3** gekauft!`, ephemeral: true });                

            } else if (lvlAtm == 3) {
                if (found.Coins < 4500) return interaction.reply({ content: `Du hast nicht genügend Coins!\nDu brauchst **4500 Coins** um **Level 4** zu kaufen!`, ephemeral: true });
                await DB.updateOne({ MemberID: interaction.member.id }, { Coins: CoinsAtm - 4500, Level: lvlAtm + 1 });
                interaction.reply({ content: `Du hast erfolgreich **Level 4** gekauft!`, ephemeral: true });                

            } else if (lvlAtm == 4) {
                if (found.Coins < 6000) return interaction.reply({ content: `Du hast nicht genügend Coins!\nDu brauchst **6000 Coins** um **Level 5** zu kaufen!`, ephemeral: true });
                await DB.updateOne({ MemberID: interaction.member.id }, { Coins: CoinsAtm - 6000, Level: lvlAtm + 1 });
                interaction.reply({ content: `Du hast erfolgreich **Level 5** gekauft!`, ephemeral: true });                

            }
        break;

        case "gamble_btn":
            if (found.Coins == 0) return interaction.reply({ content: `Du hast **keine** Coins!`, ephemeral: true });
    
            let win = false;
            const newCoins = found.Coins * 2;
            let randomNum = Math.random() * 10 + 1;
        
            if (found.Level <= 3) {
                if (randomNum > 5) win = false;
                if (randomNum <= 5) win = true;
            
            } else if (found.Level == 4) {
                if (randomNum > 6) win = false;
                if (randomNum <= 6) win = true;
            
            } else if (found.Level == 5) {
                if (randomNum > 6.5) win = false;
                if (randomNum <= 6.5) win = true;
            };
    
            const embed = new Discord.MessageEmbed()
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

            if (win) {
                await DB.updateOne({ MemberID: interaction.member.id }, { Coins: newCoins });
                interaction.reply({ embeds: [embed.setTitle("🎉 Gewonnen").setColor("GREEN").setDescription(`**Deine Coins**: ${newCoins}`)], ephemeral: true });
    
            } else if (!win) {
                await DB.updateOne({ MemberID: interaction.member.id }, { Coins: 0 });
                interaction.reply({ embeds: [embed.setTitle("❌ Verloren").setColor("RED").setDescription(`**Deine Coins**: 0`)], ephemeral: true });
    
            }
        break;

        case "lvlinfo_btn":
            const embed2 = new Discord.MessageEmbed()
            .setTitle("Level Vorteile")
            .setColor("PURPLE")
            .addFields(
                {name: "Level 1", value: "cpm = 1-10\ngwc = 50%", inline: true},
                {name: "Level 2", value: "cpm = 5-15\ngwc = 50%", inline: true},
                {name: "Level 3", value: "cpm = 7-20\ngwc = 50%", inline: true},
                {name: "Level 4", value: "cpm = 10-25\ngwc = 60%", inline: true},
                {name: "Level 5", value: "cpm = 17-30\ngwc = 65%", inline: true},
                {name: "*", value: "*cpm == coins per message*\n*gwc == gamble win chance*"}
            )
            .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

            interaction.reply({ embeds: [embed2], ephemeral: true });
        break;
    }

})