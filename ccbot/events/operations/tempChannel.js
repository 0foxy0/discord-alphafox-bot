const client = require("../../index");
const Discord = require("discord.js");
const VoiceCollection = new Discord.Collection();
const DB = require("../../schemas/tempChnDB");
const joinToCreate = "939600319384518696";
const tempChannelParent = "889836813051645952";


client.on("voiceStateUpdate", async (oldState, newState) => {

    try {
        const user = await client.users.fetch(newState.id);

        if ((oldState.mute && oldState.channel && oldState.channel.id !== joinToCreate &&
            oldState.channel.id !== VoiceCollection.get("temps"))
                                ||
           (newState.mute && newState.channel && newState.channel.id !== joinToCreate &&
            newState.channel.id !== VoiceCollection.get("temps"))) return;


        if (oldState.channel && !newState.channel) {

            if (oldState.channel.members.size == 0) {

                if (oldState.channel.id === VoiceCollection.get("temps")) return oldState.channel.delete();
            }
        }


        if ((!oldState.channel && newState.channel && newState.channel.id === joinToCreate) ||
        (oldState.channel && newState.channel && newState.channel.id === joinToCreate)) {

            const found = await DB.findOne({ MemberID: user.id });

            if (found) {
                const twoChannel = newState.guild.channels.cache.get(found.ChannelID);
                
                if (twoChannel) {

                    if (twoChannel.members.size == 0) {
                        twoChannel.delete();

                    } else {
                        newState.member.voice.setChannel(twoChannel.id);
                    }
                }
            }

            const channel = await newState.guild.channels.create(user.username + `'s Talk`, {
                type: "GUILD_VOICE",
                parent: tempChannelParent,
            });

            newState.member.voice.setChannel(channel.id);
            VoiceCollection.set("temps", channel.id);
        
            if (!found) {
                await DB.create({
                    MemberID: user.id,
                    ChannelID: channel.id,
                    UserLimit: channel.userLimit
                })

            } else {
                await DB.updateOne({ MemberID: user.id }, { ChannelID: channel.id });
                await channel.setUserLimit(found.UserLimit);
            }
        }


        if (oldState.channel && newState.channel) {

            if (oldState.channel.members.size == 0) {

                if (oldState.channel.id === VoiceCollection.get("temps")) return oldState.channel.delete();
            }
        }

    } catch (e) {
        console.log(e);
    }
})