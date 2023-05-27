const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { sendToDiscord } = require('../utils/messageSendDiscord.js');

module.exports = {

    async sendEcchi(discordClient) {
        const channel_id = '1110807641074180197'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getEcchiReddit()
        sendToDiscord(values,channel);

    }
}

async function getEcchiReddit() {
    let getEcchi = new RedditCheckPost('new', 'Ecchi')
    let getEcchiHot = new RedditCheckPost('hot', 'Ecchi')
    try {
        let EcchiRes = await getEcchi.ecchi();
        let EcchiResHot = await getEcchiHot.ecchi();

        //console.log([...EcchiRes,...EcchiResHot])
        return [...EcchiRes,...EcchiResHot]
    } catch (error) {

    }
}