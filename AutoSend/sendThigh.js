const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { AttachmentBuilder } = require('discord.js');

module.exports = {

    async sendThigh(discordClient) {
        const channel_id = '1111054182561091604'
        const channel = await discordClient.channels.fetch(channel_id);
        let errCount = 1;
        let values = await getThighReddit()
        if (values.length !== 0) {
            for (const val of values) {

                try {
                    if (val.url.includes('redgifs')) {
                        await channel.send(val.url);
                    }else if(!(val.url.startsWith('https://i')) && !(val.url.startsWith('https://v')) ){
                        await channel.send(val.url);
                        console.log(val.url)
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
                        console.log(errCount);
                        errCount++
                        //await channel.send("Something Went Wrong!")
                        //https://files.catbox.moe/6udng2.JPG
                    }
                }

 
            }
        }

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