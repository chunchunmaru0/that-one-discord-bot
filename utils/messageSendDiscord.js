const { sendRedgifsVids } = require('./sendRedgifsVid')
const { AttachmentBuilder } = require('discord.js');
async function sendToDiscord(values,channel){

    if(values === undefined) return
    if (values.length !== 0) {
        for (const val of values) {

            try {
                if (val.url.includes('redgifs')) {
                    //console.log(val.url)
                    if(val.url.startsWith('https://i')){
                        //console.log(val.url)
                        await channel.send(val.url);
                    }else {
                        await sendRedgifsVids(val.url, channel);
                    }
                    
                }else if(!(val.url.startsWith('https://i')) && !(val.url.startsWith('https://v')) ){
                    await channel.send(val.url);
                    //console.log(val.url)
                }else {
                    const file = new AttachmentBuilder(val.url);
                    await channel.send({ files: [file] });
                }
            } catch (error) {
                if(error.code === 40005){
                    await channel.send(val.url);
                    
                }else {
                    console.log(error)
                }
            }


        }
    }
}

module.exports = { sendToDiscord }