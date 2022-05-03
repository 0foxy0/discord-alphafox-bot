const client = require("../../index");
const fetch = require("node-superfetch");
const { guildID, botCountChn, memberCountChn, mcCountChn, serverIP } = require("../../config.json");

setInterval(async () => {
    const myGuild = client.guilds.cache.get(guildID);

    //BOTS    
    let botCount = myGuild.members.cache.filter(member => member.user.bot).size;
    const botChannel = myGuild.channels.cache.get(botCountChn);

    botChannel.setName(`Dc Bots: ${botCount.toLocaleString()}`).catch(err => console.log(err));

    //MEMBERS
    let memberCount = myGuild.members.cache.filter(member => !member.user.bot).size;
    const playerChn = myGuild.channels.cache.get(memberCountChn);

    playerChn.setName(`Dc Spieler: ${memberCount.toLocaleString()}`).catch(err => console.log(err));

    //MC PLAYERS AND STATUS
    const response = await fetch.get(`https://eu.mc-api.net/v3/server/ping/${serverIP}`);
    if (response.body.online === false) return;

    const mcPlayerChn = myGuild.channels.cache.get(mcCountChn);
    mcPlayerChn.setName(`Mc Spieler online: ${response.body.players.online}`).catch(err => console.log(err));  

}, 5000);