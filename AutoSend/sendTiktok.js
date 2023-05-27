const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { sendToDiscord } = require('../utils/messageSendDiscord.js');
module.exports = {

    async sendTiktok(discordClient) {
        const channel_id = '1111211487411847168' 
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getTiktok()
        sendToDiscord(values,channel);

    }
}

async function getTiktok() {
    let getTiktok = new RedditCheckPost('new', 'Tiktok')
    try {
        let tiktokRes = await getTiktok.tiktokPorn();        
        return tiktokRes
    } catch (error) {

    }
}