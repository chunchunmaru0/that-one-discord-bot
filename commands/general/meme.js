
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
        
       try {
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
       } catch (error) {
        console.log(error)
       }
    }
}
async function  imgSend(){
    
    return new Promise(resolve =>{
        var rng = Math.floor(Math.random() * 8) + 0;
        var url = new Array;
        console.log("url rng is: " + rng)
        url = [
            "https://www.reddit.com/r/Animemes/top/.json", 
            "https://www.reddit.com/r/Animemes/.json", 
            "https://reddit.com/r/Animemes/top/.json?t=week", 
            "https://reddit.com/r/Animemes/top/.json?t=month",
            "https://reddit.com/r/Animemes/top/.json?t=year",

            "https://reddit.com/r/Animemes/top/.json?t=today",
            "https://reddit.com/r/Animemes/top/.json?t=all",
            "https://www.reddit.com/r/Animemes/new/.json"
        ]
    
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
                    
                    var rng = Math.floor(Math.random() * (children.length-1) - 0) + 0;
                    console.log("children number = " + children.length)
                    console.log("Meme rng is" + rng)
                    if(rng ==25) {rng=0}
                    var imgFile = imgUrl[rng];
                    if (imgFile.startsWith("https://v.")) {
                        imgFile = imgFile + "/DASH_1080.mp4"
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