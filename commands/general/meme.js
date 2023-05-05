
const { SlashCommandBuilder } = require('discord.js');

const { prefix } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Replies with User with MEMEs!'),
    async execute(interaction,client) {
        //console.log(interaction,client)
        await interaction.deferReply({ ephemeral: false });
        await interaction.editReply({files: [{ attachment: await imgSend() }]});
    },
    name: "meme",
    aliases: ["m", "memes"],
    usage: "meme",
    category: "general",
    description: "displays the random animemes",
    accessableby: "members",

    run: async (client, message, args) => {
        let msg = await message.channel.send("Generating...")
        
        message.channel.send({//channel.send
            files: [{ attachment: await imgSend() }]
        }).then(async msg => {
            try {
                await msg.react('581795233067433985');
                await msg.react('595108561831460875');
                await msg.react('598068228220256266')
            } catch (error) {

                console.error("failed to add emoji")
            }
        }).then(message.delete(2000) ).then(msg.delete(2000))
    }
}
async function  imgSend(){
    
    return new Promise(resolve =>{
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
                    if(rng ==25) {rng=0}
                    var imgFile = imgUrl[rng];
                    if (imgFile.startsWith("https://v.")) {
                        imgFile = imgFile + "/DASH_96.mp4"
                    }
                    // if (imgFile != undefined) {
    
                    // } else {
                    //     imgFile = imgUrl[rng];
                    // }
                    //console.log("Inside Function",imgFile)
                    resolve(imgFile);
    
    
                } catch (error) {
                    console.error(error)
                }
    
    
            //    598068228220256266
    
                
    
            });
    })

}


// console.log("")
// message.channel.send({//channel.send
//    files: [{ attachment: imgFile }]
// }).then(async msg => {
//    try {
//        await msg.react('581795233067433985');
//        await msg.react('595108561831460875');
//        await msg.react('598068228220256266')
//    } catch (error) {

//        console.error("failed to add emoji")
//    }
// }).then(message.delete(2000) ).then(msg.delete(2000))