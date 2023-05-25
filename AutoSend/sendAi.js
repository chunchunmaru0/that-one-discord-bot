const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost.js');
const { AttachmentBuilder } = require('discord.js');

module.exports = {

    async sendAi(discordClient) {
        const channel_id = '1110809112092102656'
        const channel = await discordClient.channels.fetch(channel_id);
        let errCount = 1;
        let values = await getAiGenReddit()
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

async function getAiGenReddit() {
    let getAi_art = new RedditCheckPost('new', 'ai_generated')
    try {
        let Ai_artRes = await getAi_art.ai_gen();
        //console.log([...Ai_artRes,...Ai_artResHot])
        return Ai_artRes
    } catch (error) {

    }
}