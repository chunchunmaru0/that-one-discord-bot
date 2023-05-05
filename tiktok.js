const ttdl = require("tiktok-video-downloader");
const { AttachmentBuilder, EmbedBuilder,SlashCommandBuilder } = require('discord.js');

module.exports = {
    async tiktok(client, message) {

        //await message.channel.send("I checked and verified the channel.")
        if (!message.content.startsWith('https://www.tik')) {
            console.log("No video File")
            return;
        }

        const content = message.content;
        console.log(content)
        let linkArr = (content.slice().trim().split(/ +/g))
        let link = linkArr.shift().toLowerCase();
        console.log(link)


        try {
            ttdl.getInfo(link)
                .then(async (result) => {
                    console.log(result);
                    if(result.sucess == false) return
                    //console.log("here");
                    if(result.video.url.wm == undefined) return;
                    
                    let videoLink = result.video.url.wm;
                    let name= result.author.name;


                    const file = new AttachmentBuilder(videoLink)
                    .setName(`${name}.mp4`)
                    .setDescription('TikTok Video')


                    console.log(file)
                    await message.reply({files:[file]})
                    .then(setTimeout(() => { message.suppressEmbeds(true) }, 5000));
                })
        } catch (error) {
            console.log(error)
        }
    }
}

