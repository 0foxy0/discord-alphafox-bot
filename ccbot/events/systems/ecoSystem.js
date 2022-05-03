const client = require("../../index");
const DB = require("../../schemas/ecoDB");

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    let addCoins = Math.floor(Math.random() * 10) + 1;
    const found = await DB.findOne({ MemberID: message.author.id });

    if (!found) {
        DB.create({
            GuildID: message.guild.id,
            MemberID: message.author.id,
            Coins: addCoins,
            Level: 1
        })

    } else {
        let coinsAtm = found.Coins;

        if (found.Level == 1) {
            let addCoins2 = Math.floor(Math.random() * 10) + 1;
            await DB.updateOne({ MemberID: message.author.id }, { Coins: coinsAtm += addCoins2 }, {new: true});

        } else if (found.Level == 2) {
            let addCoins3 = Math.floor(Math.random() * 15) + 5;
            await DB.updateOne({ MemberID: message.author.id }, { Coins: coinsAtm += addCoins3 }, {new: true});

        } else if (found.Level == 3) {
            let addCoins4 = Math.floor(Math.random() * 20) + 7;
            await DB.updateOne({ MemberID: message.author.id }, { Coins: coinsAtm += addCoins4 }, {new: true});

        } else if (found.Level == 4) {
            let addCoins5 = Math.floor(Math.random() * 25) + 10;
            await DB.updateOne({ MemberID: message.author.id }, { Coins: coinsAtm += addCoins5 }, {new: true});

        } else if (found.Level == 5) {
            let addCoins6 = Math.floor(Math.random() * 30) + 17;
            await DB.updateOne({ MemberID: message.author.id }, { Coins: coinsAtm += addCoins6 }, {new: true});

        }
    }
});