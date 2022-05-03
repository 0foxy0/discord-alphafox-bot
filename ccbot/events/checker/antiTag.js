const client = require("../../index");
const DB = require("../../schemas/WarnDB");
const ms = require("ms");

client.on("messageCreate", async msg => {
    if (!msg.mentions) return;
    if (msg.type === "REPLY") return;
    const mentionedRoles = msg.mentions.roles;
    const mentionedMembers = msg.mentions.members;
    const returnMSG = "Du darfst **keine Teammitglieder** taggen!\nBitte lies dir nochmal die **Regeln** durch!";
    const WarnMSG = "Du hast zum **2.** mal ein **Teammitglied** getaggt!\nDu wurdest für **24h gemuted**!";

    if ((!msg.member.permissions.has("ADMINISTRATOR") || !msg.member.permissions.has("PRIORITY_SPEAKER")) && msg.channel.parent.name !== "tickets") {
        const found = await DB.findOne({ MemberID: msg.member.id });

        let teamRole = false;
        let teamMember = false;

        if (mentionedRoles.length !== 0 && mentionedMembers.length !== 0) {
            mentionedRoles.forEach(async role => {
                if (role.permissions.has("PRIORITY_SPEAKER")) {
                    teamRole = true;
                }
            });

            mentionedMembers.forEach(async member => {
                if (member.permissions.has("PRIORITY_SPEAKER")) {
                    teamMember = true;
                }
            });
        };
        

        if ((teamMember || teamRole) || (teamMember && teamRole)) {
            if (!found) await DB.create({ MemberID: msg.member.id, Warns: 1 });
            if (found) await DB.updateOne({ MemberID: msg.member.id }, { Warns: found.Warns += 1 }, {new: true});

            if (found && found.Warns === 2) return (
                msg.reply(WarnMSG),
                msg.member.timeout(ms("1d")),
                await DB.updateOne({ MemberID: msg.member.id }, { Warns: 0 }, {new: true})
            );
            
            return msg.reply(returnMSG);
        }

        if (mentionedRoles.length !== 0) {
            mentionedRoles.forEach(async role => {
                if (role.permissions.has("PRIORITY_SPEAKER")) {
                    if (!found) await DB.create({ MemberID: msg.member.id, Warns: 1 });
                    if (found) await DB.updateOne({ MemberID: msg.member.id }, { Warns: found.Warns += 1 }, {new: true});
    
                    if (found && found.Warns === 2) return (
                        msg.reply(WarnMSG),
                        msg.member.timeout(ms("1d")),
                        await DB.updateOne({ MemberID: msg.member.id }, { Warns: 0 }, {new: true})
                    );
                    
                    msg.reply(returnMSG);
                }
            });
        }

        if (mentionedMembers.length !== 0) {
            mentionedMembers.forEach(async member => {
                if (member.permissions.has("PRIORITY_SPEAKER")) {
                    if (!found) await DB.updateOne({ MemberID: msg.member.id }, { Warns: 1 });
                    if (found) await DB.updateOne({ MemberID: msg.member.id }, { Warns: found.Warns += 1 }, {new: true});
    
                    if (found && found.Warns === 2) return (
                        msg.reply(WarnMSG),
                        msg.member.timeout(ms("1d")),
                        await DB.updateOne({ MemberID: msg.member.id }, { Warns: 0 }, {new: true})
                    );
    
                    msg.reply(returnMSG);
                }
            });
        }
    }
})