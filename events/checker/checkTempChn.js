const client = require("../../index");
const { tempChnCat } = require("../../config.json");

setInterval(async () => {
    let category;

    client.channels.cache.forEach(chn => {
        if (chn.type == "GUILD_CATEGORY" && chn.id === tempChnCat) {
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