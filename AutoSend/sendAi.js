const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost.js');
const { sendToDiscord } = require('../utils/messageSendDiscord.js');

module.exports = {

    async sendAi(discordClient) {
        const channel_id = '1110809112092102656'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getAiGenReddit()
        sendToDiscord(values,channel);

    }
}

async function getAiGenReddit() {
    let getAi_art = new RedditCheckPost('new', 'ai_generated')
    try {
        let Ai_artRes = await getAi_art.ai_gen();
        //console.log([...Ai_artRes,...Ai_artResHot])
        return Ai_artRes
    } catch (error) {

    }
}