const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { sendToDiscord } = require('../utils/messageSendDiscord.js');
module.exports = {

    async sendCos(discordClient) {
        const channel_id = '586776438632349696'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getNewCosplayReddit()
        sendToDiscord(values,channel);

    }
}

async function getNewCosplayReddit() {
    let getCosplay = new RedditCheckPost('new', 'cosplay')
    ///let getCosplayHot = new RedditCheckPost('hot', 'cosplay')
    try {
        let cosplayRes = await getCosplay.cosplay();
        //let cosplayResHot = await getCosplayHot.cosplay();

        //console.log([...cosplayRes,...cosplayResHot])
        return cosplayRes
    } catch (error) {

    }
}