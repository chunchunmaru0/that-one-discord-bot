const { EmbedBuilder } = require("discord.js")


const dotenv = require('dotenv');
dotenv.config();

const sauceNaoAPI = process.env.sauceNaoAPI;
module.exports = {

    name: "sauce",
    aliases: ["sos", "sas"],
    usage: "",
    category: "general",
    description: "",
    accessableby: "",

    run: async (client, message, args) => {
        //code here
        const sEmbed = new EmbedBuilder()
        .setColor('#C32B4E')
        .setAuthor({name: "Error!", iconURL:"https://i.postimg.cc/tRcXWWc0/Png-Item-613187.png" })
        .setTimestamp()
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()});

        if (message.mentions.has(client.user.id)){
            sEmbed.setTitle("Bro Don't Fucking Mention me, Use Prefix Instead");
            return message.channel.send({embeds: [sEmbed]})
            
        }

        if (!args[0]) {
            //console.log(message)
            var Attachment = (message.attachments);
            console.log(Attachment.first() == null)
            if (Attachment.first() != null || Attachment.first() != undefined) {
                //console.log(Attachment)
                Attachment.forEach(function (attachment) {
                    var link = attachment.url
                    //console.log(link);

                    getSauce(link);
                })

            } else {
                message.channel.send("Please add an `Image` alongside with `SAUCE` command or add `IMAGE LINK` beside the `SAUCE` command to find the sauce of the picture!")

            }
        } else {
            var link = args[0];
            //console.log(link)
            getSauce(link);
        }
        function getSauce(link) {
            try {
                fetch("https://saucenao.com/search.php?output_type=2&url=" + link + "&api_key=" + sauceNaoAPI)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (jsonObj) {
                        var c = 0;

                       if(jsonObj.header.status == -4){
                            message.channel.send(":x: Use IMAGE baaaka!!  <:HeyHey:760752655881994250>")
                            console.log("Not Img")
                            return
                        }
                        var results = jsonObj.results;
                        console.log(results)
                        for (var call of results) {


                            var data = call.header
                            //console.log(call.data)
                            var similarity = data.similarity;
                            var thumbnail = data.thumbnail;
                            var index_name = data.index_name;
                            var mainValue = call.data
                            var source = mainValue.source;
                            var year = mainValue.year;
                            var pixiv_id = mainValue.pixiv_id; //on pixiv
                            var member_name = mainValue.member_name;
                            var title = mainValue.title; //of pixiv
                            var danbooru_id = mainValue.danbooru_id;
                            var material = mainValue.material; //on danbooru
                            var character = mainValue.characters; //on danbooru
                            var aniDb_id = mainValue.anidb_aid;
                            var part = mainValue.part;
                            var est_time = mainValue.est_time;
                            var drawr_id = mainValue.drawr_id //on drawr
                            var da_id = mainValue.da_id //Deviant Art
                            var author_name = mainValue.author_name //Deviant art Author Name
                            var author_url = mainValue.author_url // Deviantart Author URL

                            var creator = mainValue.creator //creater on booru site


                            var percentage = parseFloat(similarity);

                            if (percentage <= 60) {

                                if (c != 0) {
                                    // message.channel.send("thats it")
                                    console.log("SAUCE FOUND!")
                                } else {
                                    message.channel.send(" :x: Sadly, Couldn't find the SAUCE <:PePe_hands:595077130665197579>")
                                }
                                break;
                            }
                            var url = mainValue.ext_urls;


                            console.log("similarity:", similarity, "source:", source, "year:", year, "index-name:", index_name, "External Url:", url);


                            const embed = new EmbedBuilder()
                                .setColor(0x0099FF)
                                .setTitle("here's the SAUCE: ")
                                .setThumbnail(thumbnail)
                                .addFields({ name: "**Similarity:**", value: similarity })

                            if (title != undefined) { embed.addFields({ name: "**Title:**", value: title }) }
                            if (url != undefined && url != "") {
                                if (Array.isArray(url)) {
                                    embed.setURL(url[0])
                                    embed.addFields({ name: "**External Url:**", value: url[0] })
                                }
                            }
                            //console.log(creator)

                            if (source != undefined && source != "") { embed.addFields({ name: "**Source:**", value: source }) }
                            if (creator != undefined && creator != "") {
                                if (Array.isArray(creator)) {
                                    embed.addFields({ name: "**Creator:**", value: creator[0] })

                                }
                            }
                            if (pixiv_id != undefined && pixiv_id != "") { embed.addFields({ name: "**Pixiv ID:**", value: pixiv_id.toString() }) }
                            if (member_name != undefined && member_name != "") { embed.addFields({ name: "**Member Name:**", value: member_name }) }
                            if (drawr_id != undefined && drawr_id != "") { embed.addFields({ name: "**Drawr ID**", value: drawr_id.toString() }) }
                            if (da_id != undefined && da_id != "") { embed.addFields({ name: "**Deviantart ID:**", value: da_id.toString() }) }
                            if (author_name != undefined && author_name != "") { embed.addFields({ name: "**Author Name**", value: author_name.toString() }) }
                            if (author_url != undefined && author_url != "") { embed.addFields({ name: "**Author url**", value: author_url }) }
                            if (danbooru_id != undefined && danbooru_id != "") {
                                //console.log(danbooru_id)
                                embed.addFields({ name: "**Danbooru ID:**", value: danbooru_id.toString() })
                            }
                            if (material != undefined && material != "") { embed.addFields({ name: "**Material:**", value: material }) }
                            if (character != undefined && character != "") { embed.addFields({ name: "**Character:**", value: character }) }
                            if (aniDb_id != undefined && aniDb_id != "") { embed.addFields({ name: "**AniDB ID:**", value: aniDb_id.toString() }) }
                            if (year != undefined && year != "") { embed.addFields({ name: "**Year:**", value: year.toString() }) }
                            if (part != undefined && part != "") { embed.addFields({ name: "**Part:**", value: part.toString() }) }
                            if (est_time != undefined && est_time != "") { embed.addFields({ name: "**Estimated Time:**", value: est_time.toString() }) }
                            if (index_name != undefined && index_name != "") { embed.addFields({ name: "**Index:**", value: index_name.toString() }) }
                            if (source != undefined && source != "") { embed.addFields({ name: "**Source:**", value: source.toString() }) }

                            message.channel.send({ embeds: [embed] });
                            c = c + 1;


                        }
                    })
            }
            catch (error) {

                message.channel.send("sorry plz insert a valid photo file")
                console.log(error)
            }

        }
    }
}
