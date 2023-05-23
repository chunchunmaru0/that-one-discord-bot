const RedditCheckPost = require('./reddit-wrapper/RedditCheckPost.js');
const { AttachmentBuilder } = require('discord.js');

module.exports = {

    async sendCos(discordClient) {
        const channel_id = '586776438632349696'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getNewCosplayReddit()
        if (values.length !== 0) {
            for (const val of values) {

                try {
                    console.log(val.url)
                    if (val.url.includes('redgifs')) {
                        await channel.send(val.url);
                    }else {
                        const file = new AttachmentBuilder(val.url);
                        await channel.send({ files: [file] });
                    }
                    //await channel.send(val.url);


                } catch (error) {
                    if(error.code === 40005){
                        await channel.send(val.url);
                    }else {
                        console.log(error)
                        //await channel.send("Something Went Wrong!")
                        //https://files.catbox.moe/6udng2.JPG
                    }
                }


            }
        }

    }
}

async function getNewCosplayReddit() {
    let getCosplay = new RedditCheckPost('new', 'cosplay')
    try {
        let cosplayRes = await getCosplay.cosplay();
        return (cosplayRes)
    } catch (error) {

    }
}