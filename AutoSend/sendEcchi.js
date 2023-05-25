const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { AttachmentBuilder } = require('discord.js');

module.exports = {

    async sendEcchi(discordClient) {
        const channel_id = '1110807641074180197'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getEcchiReddit()
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
                        //await channel.send("Something Went Wrong!")
                        //https://files.catbox.moe/6udng2.JPG
                    }
                }


            }
        }

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