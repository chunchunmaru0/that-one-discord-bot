const RedditCheckPost = require('../reddit-wrapper/RedditCheckPost');
const { AttachmentBuilder } = require('discord.js');
module.exports = {

    async sendMemes(discordClient) {
        const channel_id = '594964222677614592'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getNewMemesReddit()
        console.log(values)
        if (values === undefined) return
        if (values.length !== 0) {
            for (const val of values) {
                try {
                    let fileName = val.url.split('/').pop();
                    // const file = new AttachmentBuilder(val.url)
                    //     .setName(fileName)
                    //     .setDescription(val.title);

                    const exampleEmbed = {
                        title: val.title,
                        image: {
                             url: val.url, //`attachment://${fileName}`,
                        },
                    };
                    //console.log(file)
                    await channel.send({ embeds: [exampleEmbed]}) //, files: [file]});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}

async function getNewMemesReddit() {
    let getMemes = new RedditCheckPost('new', 'Memes')
    try {
        let MemesRes = await getMemes.meme();
        return (MemesRes)
    } catch (error) {

    }
}