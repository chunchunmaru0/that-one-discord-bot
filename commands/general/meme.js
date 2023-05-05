
const { SlashCommandBuilder } = require('discord.js');

const { prefix } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Replies with User with MEMEs!'),
    async execute(interaction,client) {
        //console.log(interaction,client)
        await interaction.reply("Not Done Yet Use the command with Prefix Instead");
    },
    name: "meme",
    aliases: ["m", "memes"],
    usage: "meme",
    category: "general",
    description: "displays the random animemes",
    accessableby: "members",

    run: async (client, message, args) => {
       
        imgSend(message);
    }
}
async function  imgSend(message){
    let msg = await message.channel.send("Generating...")

    var rng = Math.floor(Math.random() * 3) + 0;
    var url = new Array;
    console.log("url rng is: " + rng)
    url = ["https://www.reddit.com/r/Animemes/top/.json", "https://www.reddit.com/r/Animemes/.json", "https://reddit.com/r/Animemes/top/.json?t=week", "https://reddit.com/r/Animemes/top/.json?t=month"]

    fetch(url[rng])
        .then(function (response) {
            console.log(url[rng])
            return response.json();
        })
        .then(function (jsonObj) {

            try {
                var data = jsonObj.data;
                var children = data.children;
                var imgUrl = new Array;

                for (var i = 1; i < children.length; i++) {
                    var childData = children[i].data;
                    imgUrl[i] = childData.url;
                };
                var rng = Math.floor(Math.random() * children.length - 3 + 1) + 3;
                console.log("children number = " + children.length)
                console.log("Meme rng is" + rng)
                var imgFile = imgUrl[rng];
                if (imgFile.startsWith("https://v.")) {
                    imgFile = imgFile + "/DASH_96.mp4"
                }
                // if (imgFile != undefined) {

                // } else {
                //     imgFile = imgUrl[rng];
                // }

                console.log(imgFile);

                console.log("")
                return message.channel.send({//channel.send
                    files: [{ attachment: imgFile }]
                }).then(async msg => {
                    try {
                        await msg.react('581795233067433985');
                        await msg.react('595108561831460875');
                        await msg.react('598068228220256266')
                    } catch (error) {

                        console.error("failed to add emoji")
                    }
                }).then(message.delete(2000) ).then(msg.delete(2000))
            } catch (error) {
                console.error(error)
            }


        //    598068228220256266

            

        });
}