const ttdl = require("tiktok-video-downloader");
const { v1, v2 } = require("node-tiklydown");
const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    async tiktok(client, message) {

        //await message.channel.send("I checked and verified the channel.")
        if (!message.content.startsWith('https://www.tik')) {
            console.log("No video File")
            return;
        }

        let msg = await message.channel.send("Hmm...Clipping Your Link, Let me Process!!")
        const content = message.content;
        //console.log(content)
        let linkArr = (content.slice().trim().split(/ +/g))
        let link = linkArr.shift();
        console.log(link)


        try {
            ttdl.getInfo(link)
                .then(async (result) => {
                    console.log(link)
                    console.log(result);
                    if (result.sucess == false) return
                    //console.log("here");
                    let videoLink;
                    let name;
                    if (result.video.url.wm == undefined) {
                        console.log(link)
                        // v1(link).then(async data => {
                        //     // Do something with the data
                        //     videoLink = data.video.noWatermark;
                        //     name = data.title;
                        //     //console.log("Version 1", data)
                        //     console.log(videoLink, name)
                        //     const file = new AttachmentBuilder(videoLink)
                        //         .setName(`${name}.mp4`)
                        //         .setDescription('TikTok Video')


                        //     console.log(file)
                        //     await message.reply({ files: [file] })
                        //         .then(setTimeout(() => { message.suppressEmbeds(true) }, 5000))
                        //         .then(setTimeout(() => {msg.delete()},5000));
                        // });
                    } else {
                        videoLink = result.video.url.no_wm;
                        name = result.author.name;
                        console.log("From TVD",videoLink, name)
                        const file = new AttachmentBuilder(videoLink)
                            .setName(`${name}.mp4`)
                            .setDescription('TikTok Video')


                        console.log(file)
                        await message.reply({ files: [file] })
                            .then(setTimeout(() => { message.suppressEmbeds(true) }, 5000))
                            .then(setTimeout(() => {msg.delete()},5000));

                    }





                })
        } catch (error) {
            console.log(error)
            await message.reply("Welp! Got an Error Dude!")
        }
    }
}

