const client = require("../../index");
const Discord = require("discord.js");
const DB = require("../../schemas/ticketDB");
const opsDB = require("../../schemas/ticketOpsDB");

client.on("interactionCreate", async interaction => {

    if (!["support_ticket", "apply_ticket", "bug_ticket"].includes(interaction.customId)) return;

    const opsFound = await opsDB.findOne({ GuildID: interaction.guild.id });
    if (!opsFound) return interaction.reply({ content: "Es gibt keine Ticket Einstellungen bitte melde das einem @Discord Developer!", ephemeral: true });

    if (interaction.customId == "support_ticket") {

        const found = await DB.findOne({ MemberID: interaction.member.id, Type: "support_ticket", Closed: false })
        if (found) return interaction.user.send(`Du hast bereits auf **${interaction.guild.name}** ein Support-Ticket offen!`).catch(e => {console.log(e)});

        let category;
        interaction.deferUpdate();

            interaction.guild.channels.cache.forEach(chn => {
                if (chn.type == "GUILD_CATEGORY" && !category && chn.name.toLowerCase() == "tickets") {
                    category = chn;
                }
            })

            if (!category) {
                await interaction.guild.channels.create("tickets", {
                    type: "GUILD_CATEGORY",
                    PermissionOverwrites: [
                        {id: interaction.guild.id, deny: ["VIEW_CHANNEL"]},
                        {id: client.user.id, allow: ["VIEW_CHANNEL"]},
                    ]
                }).then(l => category = l);
            }

            interaction.guild.channels.create(interaction.user.username + `-support`, {
                type: "GUILD_TEXT",
                parent: category,
                permissionOverwrites: [
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
                    { id: client.user.id, allow: ["VIEW_CHANNEL"] },
                    { id: opsFound.SupRoleID, allow: ["VIEW_CHANNEL"] }
                ]

            }).then(async chn => {
                await DB.create({
                    GuildID: interaction.guild.id,
                    MemberID: interaction.member.id,
                    ChannelID: chn.id,
                    Closed: false,
                    Locked: false,
                    Type: interaction.customId
                })

                chn.permissionOverwrites.edit(interaction.user, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true
                })

                let embed = new Discord.MessageEmbed()
                .setTitle("Support Ticket")
                .setDescription("- Bitte erläutere uns dein Anliegen genau, damit wir dir schnellen und reibungslosen Support bieten können!"
                + "\n" +
                "- Beachte das wir die Tickets nicht zu jeder Zeit bearbeiten können!"
                + "\n" +
                "- Das Supporter Team wurde kontaktiert und wird sich schnellst möglichst um dein Anliegen kümmern!"
                + "\n" + "\n" +
                "Das Ticket kannst du mit 🔒 schließen"
                )
                .setColor("RED")
                .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
            

                let row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel("Ticket schließen")
                    .setCustomId("close_ticket")
                    .setStyle("DANGER")
                    .setEmoji("🔒"),

                    new Discord.MessageButton()
                    .setLabel("Lock")
                    .setCustomId("lock_ticket")
                    .setStyle("SECONDARY")
                    .setEmoji("🚫"),

                    new Discord.MessageButton()
                    .setLabel("Unlock")
                    .setCustomId("unlock_ticket")
                    .setStyle("SECONDARY")
                    .setEmoji("✔️")
                );

                chn.send({ embeds: [embed], components: [row] });
                chn.send("@here")

                setTimeout(() => {
                    chn.bulkDelete(1, true)
                  }, 1000 * 1)

            })

        } else if (interaction.customId == "apply_ticket") {

            const found = await DB.findOne({ MemberID: interaction.member.id, Type: "apply_ticket", Closed: false })
            if (found) return interaction.user.send(`Du hast bereits auf **${interaction.guild.name}** ein Bewerbungs-Ticket offen!`).catch(e => {console.log(e)});
    
    
            let category;
            interaction.deferUpdate();
    
                interaction.guild.channels.cache.forEach(chn => {
                    if (chn.type == "GUILD_CATEGORY" && !category && chn.name.toLowerCase() == "tickets") {
                        category = chn;
                    }
                })
    
                if (!category) {
                    await interaction.guild.channels.create("tickets", {
                        type: "GUILD_CATEGORY",
                        PermissionOverwrites: [
                            {id: interaction.guild.id, deny: ["VIEW_CHANNEL"]},
                            {id: client.user.id, allow: ["VIEW_CHANNEL"]},
                        ]
                    }).then(l => category = l);
                }
    
                interaction.guild.channels.create(interaction.user.username + `-bewerbung`, {
                    type: "GUILD_TEXT",
                    parent: category,
                    permissionOverwrites: [
                        { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
                        { id: client.user.id, allow: ["VIEW_CHANNEL"] },
                        { id: opsFound.ApplyRoleID, allow: ["VIEW_CHANNEL"] }
                    ]
    
                }).then(async chn => {
                    await DB.create({
                        GuildID: interaction.guild.id,
                        MemberID: interaction.member.id,
                        ChannelID: chn.id,
                        Closed: false,
                        Locked: false,
                        Type: interaction.customId
                    })
    
                    chn.permissionOverwrites.edit(interaction.user, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true
                    })
    
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Bewerbungs Ticket")
                    .setDescription(
                    "- Beachte das wir die Tickets nicht zu jeder Zeit bearbeiten können!"
                    + "\n" +
                    "- Das Team wurde kontaktiert und wird sich schnellst möglichst um dein Anliegen kümmern!"
                    + "\n" + "\n" +
                    "Das Ticket kannst du mit 🔒 schließen"
                    )
                    .setColor("RED")
                    .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
                
    
                    let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setLabel("Ticket schließen")
                        .setCustomId("close_ticket")
                        .setStyle("DANGER")
                        .setEmoji("🔒"),
    
                        new Discord.MessageButton()
                        .setLabel("Lock")
                        .setCustomId("lock_ticket")
                        .setStyle("SECONDARY")
                        .setEmoji("🚫"),
    
                        new Discord.MessageButton()
                        .setLabel("Unlock")
                        .setCustomId("unlock_ticket")
                        .setStyle("SECONDARY")
                        .setEmoji("✔️")
                    );
    
                    chn.send({ embeds: [embed], components: [row] });
                    chn.send("@here")
    
                    setTimeout(() => {
                        chn.bulkDelete(parseInt(1), true)
                      }, 1000 * 1)
    
                })

            } else if (interaction.customId == "bug_ticket") {

                const found = await DB.findOne({ MemberID: interaction.member.id, Type: "bug_ticket", Closed: false })
                if (found) return interaction.user.send(`Du hast bereits auf **${interaction.guild.name}** ein Bug-Ticket offen!`).catch(e => {console.log(e)});
        
        
                let category;
                interaction.deferUpdate();
        
                    interaction.guild.channels.cache.forEach(chn => {
                        if (chn.type == "GUILD_CATEGORY" && !category && chn.name.toLowerCase() == "tickets") {
                            category = chn;
                        }
                    })
        
                    if (!category) {
                        await interaction.guild.channels.create("tickets", {
                            type: "GUILD_CATEGORY",
                            PermissionOverwrites: [
                                {id: interaction.guild.id, deny: ["VIEW_CHANNEL"]},
                                {id: client.user.id, allow: ["VIEW_CHANNEL"]},
                            ]
                        }).then(l => category = l);
                    }
        
                    interaction.guild.channels.create(interaction.user.username + `-bug`, {
                        type: "GUILD_TEXT",
                        parent: category,
                        permissionOverwrites: [
                            { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
                            { id: client.user.id, allow: ["VIEW_CHANNEL"] },
                            { id: opsFound.BugRoleID, allow: ["VIEW_CHANNEL"] }
                        ]
        
                    }).then(async chn => {
                        await DB.create({
                            GuildID: interaction.guild.id,
                            MemberID: interaction.member.id,
                            ChannelID: chn.id,
                            Closed: false,
                            Locked: false,
                            Type: interaction.customId
                        })
        
                        chn.permissionOverwrites.edit(interaction.user, {
                            VIEW_CHANNEL: true,
                            SEND_MESSAGES: true,
                            ATTACH_FILES: true
                        })
        
                        let embed = new Discord.MessageEmbed()
                        .setTitle("Bug Ticket")
                        .setDescription("- Bitte erläutere uns dein Anliegen genau, damit wir dir schnellen und reibungslosen Support bieten können!"
                        + "\n" +
                        "- Beachte das wir die Tickets nicht zu jeder Zeit bearbeiten können!"
                        + "\n" +
                        "- Das Supporter Team wurde kontaktiert und wird sich schnellst möglichst um dein Anliegen kümmern!"
                        + "\n" + "\n" +
                        "Das Ticket kannst du mit 🔒 schließen"
                        )
                        .setColor("RED")
                        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png")
                    
        
                        let row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                            .setLabel("Ticket schließen")
                            .setCustomId("close_ticket")
                            .setStyle("DANGER")
                            .setEmoji("🔒"),
        
                            new Discord.MessageButton()
                            .setLabel("Lock")
                            .setCustomId("lock_ticket")
                            .setStyle("SECONDARY")
                            .setEmoji("🚫"),
        
                            new Discord.MessageButton()
                            .setLabel("Unlock")
                            .setCustomId("unlock_ticket")
                            .setStyle("SECONDARY")
                            .setEmoji("✔️")
                        );
        
                        chn.send({embeds: [embed], components: [row]});
                        chn.send("@here")
        
                        setTimeout(() => {
                            chn.bulkDelete(1, true)
                          }, 1000 * 1)
        
                    })
        
                }
})