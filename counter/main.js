const Discord = require("discord.js");
const fetch = require("node-superfetch");

const client = new Discord.Client({
    intents: 32767,
});

client.login("");

client.once("ready", () => {
    console.log("READY!");

    const myGuild = client.guilds.cache.get("");
    

    
    setInterval(async () => {

        //BOTS    
        let botCount = myGuild.members.cache.filter(member => member.user.bot).size;
        const botChannel = myGuild.channels.cache.get("");

        botChannel.setName(`DC Bots: ${botCount.toLocaleString()}`).catch(err => console.log(err));


        //MEMBERS
        let memberCount = myGuild.members.cache.filter(member => !member.user.bot).size;
        const playerChn = myGuild.channels.cache.get("");

        playerChn.setName(`DC Spieler: ${memberCount.toLocaleString()}`).catch(err => console.log(err));


        //MC PLAYERS AND STATUS
        const response = await fetch.get("");


        const mcPlayerChn = myGuild.channels.cache.get("");
        mcPlayerChn.setName(`MC Spieler online: ${response.body.players.online}`).catch(err => console.log(err));  
                
        const statusChn = myGuild.channels.cache.get("");  
        if (response.body.online === true) {
                
            statusChn.setName(`Server Status: online`).catch(err => console.log(err));
                        
        } else if (response.body.online === false) {
                
            statusChn.setName(`Server Status: offline`).catch(err => console.log(err));
                
        } else return;

    }, 5000);


})