const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    async pinterest(client, message) {

        //await message.channel.send("I checked and verified the channel.")
        if (message.content.startsWith('https://pin')) {
            console.log("No video File")
            let msg = await message.channel.send("WAUU! Booogie!! Sending Pin")
            const content = message.content;
            //console.log(content)
            let linkArr = (content.slice().trim().split(/ +/g))
            let link = linkArr.shift();
            console.log("Link to Clip:", link)

            var bodyFormData = new FormData();
            bodyFormData.append('url', link);
            axios({
                method: "post",
                url: "https://www.expertsphp.com/download.php",
                data: bodyFormData,

            })
                .then(async function (response) {
                    //handle success
                    //console.log(response.data);
                    const $ = cheerio.load(response.data);
                    let list = [];

                    $('table').find('a').each(function (index, element) {
                        //console.log(element)
                        list.push($(element).attr('href'));
                    });
                    console.log(list)
                    let vidLink = list.shift();
                    console.log(vidLink)
                    const file = new AttachmentBuilder(vidLink)
                        .setName(`pinterest_test.mp4`)
                        .setDescription('Pinterest Video')


                    console.log(file)
                    await message.reply({ files: [file] })
                    .then(setTimeout(() => { message.suppressEmbeds(true) }, 5000))
                    .then(setTimeout(() => { msg.delete() }, 5000))
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }



    }

}