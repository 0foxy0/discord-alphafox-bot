const Discord = require("discord.js");
const client = require("../../index");
const { supWaitChn, supChat } = require("../../config.json");

client.on("voiceStateUpdate", async (oldState, newState) => {

    try {

        if (oldState.channel && !newState.channel) return;

        if ((!oldState.channel && newState.channel.id === supWaitChn) || (oldState.channel && newState.channel.id === supWaitChn)) {
            if (!newState.channel) return;

            let sent = false;

            const notesChannel = newState.guild.channels.cache.get(supChat);

            if (sent === false) {
                notesChannel.send(`||@here||\n${newState.member} wartet im Support-Warteraum bitte kümmert euch um ihn!`).then(sent = true);
            }

            setInterval(async () => {
                sent = false;
            }, 300000)

        }


    } catch (e) {
        console.log(e);
    }


})