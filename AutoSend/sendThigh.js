const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { sendToDiscord } = require('../utils/messageSendDiscord.js');

module.exports = {

    async sendThigh(discordClient) {
        const channel_id = '1111054182561091604'
        const channel = await discordClient.channels.fetch(channel_id);
        let values = await getThighReddit()
        sendToDiscord(values,channel);

    }
}

async function getThighReddit() {
    let getThighs = new RedditCheckPost('new', 'thighdeology')
    try {
        let ThighsRes = await getThighs.thigh();
        return ThighsRes
    } catch (error) {
        console.log(error)
    }
}