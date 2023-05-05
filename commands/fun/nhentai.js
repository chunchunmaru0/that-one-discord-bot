const { EmbedBuilder,SlashCommandBuilder } = require('discord.js');

module.exports = {
    //For Slash Commands
	data: new SlashCommandBuilder()
		.setName('nhentai')
		.setDescription('Displays The given NukeCode Tags and stuff '),
	async execute(interaction,client) {
        await interaction.reply("Being Developed")
    },

    //For Prefix
    name: "nhentai",
	aliases: ["nh", "nuke"],
	usage: "",
	category: "fun",
	description: "Displays The given NukeCode Tags and stuff '",
	accessableby: "",

	run: async (client, message, args) => {
		await message.channel.send({ embeds: [await sendEmbed(message,client,args)] });
        
       
	}
}

async function sendEmbed(msgOrInter,client,args){
    return new Promise(async resolve =>{
        console.log(args)
        const sEmbed = new EmbedBuilder()
        .setColor('#C32B4E')
        .setAuthor({name: "Error!", iconURL:"https://i.postimg.cc/tRcXWWc0/Png-Item-613187.png" })
        .setTimestamp()
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()});
        let nuke;
        if (msgOrInter.mentions.has(client.user.id)){
            sEmbed.setTitle("Bro Don't Fucking Mention me, Use Prefix Instead");
            resolve(sEmbed)
            return
        }

        if (!args[0]) {
            //random nhentai
            console.log("inside no args")
            let n =Math.floor(Math.random() * (6 - 3) ) + 3;
            //let n =6;
            nuke = Math.floor((Math.random()*0.9+0.1)*Math.pow(10,n))
            console.log(n, nuke);
            const hentaiObj = await doNhentai(nuke)
            nHentaiEmbedder(hentaiObj)


            
        } else {
            console.log("Found args")
            nuke= args[0];

            const hentaiObj = await doNhentai(nuke)
            nHentaiEmbedder(hentaiObj)
        
        }
        function nHentaiEmbedder(hentaiObj){
            if(hentaiObj.error){
                
                
                resolve(sEmbed)
                return
            }
    
            if(hentaiObj.pretty != undefined && hentaiObj.pretty != ''){sEmbed.setAuthor({name: hentaiObj.pretty, iconURL:"https://i.postimg.cc/tRcXWWc0/Png-Item-613187.png",url:hentaiObj.url })}
            //if(hentaiObj.title != undefined && hentaiObj.title != ''){sEmbed.setTitle(hentaiObj.title)}//Too big
            if(hentaiObj.thumbnail != undefined && hentaiObj.thumbnail != ''){sEmbed.setThumbnail(hentaiObj.thumbnail)}
            if(hentaiObj.url != undefined && hentaiObj.url != ''){sEmbed.setURL(hentaiObj.url)}
            if(hentaiObj.artist != undefined && hentaiObj.artist != ''){
                sEmbed.addFields(
                    {
                    name: 'Artist:', value:hentaiObj.artist.join(", "),inline:true
                    }
                )
            }
            if(hentaiObj.group != undefined && hentaiObj.group != ''){
                sEmbed.addFields(
                    {
                    name: 'Group:', value:hentaiObj.group.join(", "),inline:true
                    }
                )
            }
            if(hentaiObj.tags != undefined && hentaiObj.tags != ''){
                sEmbed.addFields(
                    {
                    name: 'Tags', value:hentaiObj.tags.join(", "),inline:false
                    },
                    { name: '\u200B', value: '\u200B' },
                )
            }
            if(hentaiObj.language != undefined && hentaiObj.language != ''){sEmbed.addFields({ name: 'Language', value: hentaiObj.language,inline:true },)}
            if(hentaiObj.parody != undefined && hentaiObj.parody != ''){sEmbed.addFields({ name: 'Parody', value: hentaiObj.parody,inline:true },)}
            if(hentaiObj.category != undefined && hentaiObj.category != ''){sEmbed.addFields({ name: 'category', value: hentaiObj.category,inline:true },)}
            if(hentaiObj.date != undefined && hentaiObj.date != ''){
                sEmbed.addFields(
                    { name: '\u200B', value: '\u200B' },
                    {name: 'Uploaded At:', value: (hentaiObj.date).toLocaleDateString("default")}
            )}
            if(hentaiObj.url != undefined && hentaiObj.url != ''){sEmbed.addFields({ name: 'Link', value: hentaiObj.url,inline:true },)}
            if(hentaiObj.thumbnail != undefined && hentaiObj.thumbnail != ''){
                {sEmbed.setImage(hentaiObj.thumbnail)}
            }
           
            resolve(sEmbed) 
            console.log("resolve");
        }
    })





    


	
}

async function doNhentai(code){
    return new Promise(async resolve =>{
        console.log("doing this");
        const response = await fetch(`https://nhentai-net.translate.goog/api/gallery/${code}?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en-US&_x_tr_pto=wapp`)
        const responseObj =  response.json();
        const nhenRes = await responseObj;
    
        if (nhenRes.error) {
            console.log("nHentai Threw Error")
            var resultObj ={'error':true,}
            resolve(resultObj);
            return
        }
        var media_id = nhenRes.media_id;
        var title =nhenRes.title.english;
        var unixDate = nhenRes.upload_date;
        var putTags = [];
        var artistName=[];
        var groupName=[];
        var tags;
        var language;
        var parody;
        var url;
        var category;
        var altLang = nhenRes.title.pretty;
        var date = new Date(unixDate * 1000);
        // console.log(date.toLocaleDateString("default"));
    
        tags = (nhenRes.tags)
        url = "https://nhentai.net/g/" + code;
        var imgUrl = `https://t.nhentai.net/galleries/${media_id}/cover.jpg`
    
        for (let j = 0; j < tags.length; j++) {
            const element = tags[j];
    
            if (element.type == 'artist') {
                artistName.push(element.name);
    
            } else if (element.type == 'group') {
                groupName.push(element.name)
            } else if (element.type == 'language') {
                language = element.name
            } else if (element.type == 'category') {
                category = element.name
            } else if (element.type == 'parody') {
                parody = element.name
            }
            else {
               putTags.push(element.name);
            }
        }
        var resultObj ={
            'title': title,
            'pretty': altLang,
            'artist': artistName,
            'group':groupName,
            'language': language,
            'parody': parody,
            'url':url,
            'thumbnail':imgUrl,
            'category':category,
            'date':date,
            'tags':putTags,
            'error':false,
    
    
        }
        console.log(resultObj);
        resolve(resultObj);
    })


}