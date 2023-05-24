const RedditCheckPost = require('./reddit-wrapper/RedditCheckPost.js');

module.exports = {

    async sendMemes(discordClient) {
        const channel_id = '594964222677614592'
        const channel = await discordClient.channels.fetch(channel_id);

        let values = await getNewMemesReddit()
        if (values.length !== 0) {
            for (const val of values) {
                try {
                    await channel.send(val.url);
                } catch (error) {       
                        console.log(error)
                        //await channel.send("Something Went Wrong!")
                        //https://files.catbox.moe/6udng2.JPG                
                }
            }
        }
    }
}

async function getNewMemesReddit() {
    let getMemes = new RedditCheckPost('hot', 'Memes')
    try {
        let MemesRes = await getMemes.meme();
        return (MemesRes)
    } catch (error) {

    }
}