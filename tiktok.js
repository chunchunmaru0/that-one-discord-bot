const ttdl = require("tiktok-video-downloader");
const { v1 } = require("node-tiklydown");
const { AttachmentBuilder} = require('discord.js');

module.exports = {
    async tiktok(client, message) {

        //await message.channel.send("I checked and verified the channel.")
        if (!message.content.startsWith('https://www.tik')) {
            //console.log("No video File")
            return;
        }

        let msg = await message.channel.send("Hmm...Clipping The Tiktok, Let me Process!!")
        const content = message.content;
        //console.log(content)
        let linkArr = (content.slice().trim().split(/ +/g))
        let link = linkArr.shift();
        console.log("Link to Clip:", link)


        try {
            ttdl.getInfo(link)
                .then(async (result) => {
                    // console.log("Inside regular:", link)
                    // console.log(result);
                    if (result.sucess == false) return
                    //console.log("here");
                    let videoLink;
                    let name;
                    if (result.video.url.wm == undefined) {

                        try {
                            console.log("Inside Undefined Error:", link)
                            let msg2 = await message.channel.send("Oof! Trying Another Method!!")
                            v1(link).then(async data => {
                                // Do something with the data
                                if(data.status === 404){
                                    await message.reply("Welp! Got an Error Dude!")
                                    return
                                   }

                                videoLink = data.video.noWatermark;
                                name = data.title;
                                //console.log("Version 1", data)
                                console.log(videoLink, name)
                                const file = new AttachmentBuilder(videoLink)
                                    .setName(`${name}.mp4`)
                                    .setDescription('TikTok Video')


                                //console.log(file)
                               try {
                                 await message.reply({ files: [file] })
                                     .then(setTimeout(() => { message.suppressEmbeds(true) }, 5000))
                                     .then(setTimeout(() => { msg.delete() }, 5000))
                                     .then(setTimeout(() => { msg2.delete() }, 5000));
                               } catch (error) {
                                await message.reply("Welp! Got an Error Dude!")
                               }
                            });
                        } catch (error) {
                            await message.reply("Welp! Got an Error Dude!")
                            //console.log(error)
                        }

                    } else {
                        videoLink = result.video.url.no_wm;
                        name = result.author.name;
                        //console.log("From TVD", videoLink, name)
                        const file = new AttachmentBuilder(videoLink)
                            .setName(`${name}.mp4`)
                            .setDescription('TikTok Video')


                        console.log(file)
                        try {
                            await message.reply({ files: [file] })
                                .then(setTimeout(() => { message.suppressEmbeds(true) }, 5000))
                                .then(setTimeout(() => { msg.delete() }, 5000));
                        } catch (error) {
                            await message.reply("Welp! Got an Error Dude!");
                            console.log(error)
                        }

                    }





                })
        } catch (error) {
            console.log(error)
            await message.reply("Welp! Got an Error Dude!").then(setTimeout(() => { msg.delete() }, 5000));
        }
    }
}

