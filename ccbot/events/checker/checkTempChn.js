const client = require("../../index");

setInterval(async () => {
    let category;

    client.channels.cache.forEach(chn => {
        if (chn.type == "GUILD_CATEGORY" && chn.id === "889836813051645952") {
            category = chn;
        }
    })
    
    if (!category) return;
    const channels = category.children;

    if (channels.size >= 1) {

        channels.forEach(chn => {
            if (chn.members.size === 0) {
                chn.delete();
            }
        })

    }

}, 10000)