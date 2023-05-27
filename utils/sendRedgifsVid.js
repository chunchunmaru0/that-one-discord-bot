
const { downloadRedgifsHD, downloadRedgifsSD, delVid } = require('./redgifs')
const { AttachmentBuilder } = require('discord.js');

async function sendRedgifsVids(url, channel) {
    //console.log(url)
    return await new Promise(async resolve => {
        try {
            let vidLoc = (await downloadRedgifsHD(url, './vids'))
            let vidName = vidLoc.split('/').pop()
            const file = new AttachmentBuilder(vidLoc)
                .setName(`${vidName}`)
                .setDescription('rg '+ url)

            //console.log(file)

            try {
                resolve(await channel.send({ files: [file] }).then(() => {
                    setTimeout(() => {
                        delVid(vidLoc)
                    }, 5000);

                }))
            } catch (error) {
                delVid(vidLoc);
                if (error.code === 40005) {
                    //console.log("File Big trying SD for ", url)

                    try {
                        let vidLocN = (await downloadRedgifsSD(url, './vids'))
                        let vidName = vidLocN.split('/').pop()
                        const file = new AttachmentBuilder(vidLocN)
                            .setName(`${vidName}`)
                            .setDescription('rg '+url)

                        //console.log(file)
                        resolve(await channel.send({ files: [file] }).then(() => {
                            setTimeout(() => {
                                delVid(vidLocN)
                            }, 5000);

                        }).catch(err => { resolve(console.log(err)) }))
                    } catch (error) {
                        resolve(console.log(error))
                    }

                } else {
                    resolve(console.log(error))
                }
            }
        } catch (error) {
            await channel.send(url);
            resolve(console.log(error))
        }
    })




}


module.exports = { sendRedgifsVids }