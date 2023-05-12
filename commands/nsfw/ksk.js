const mongoose = require('mongoose');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

mongoose.connect('mongodb://192.168.1.12:27017/kskDB')
const kskGalleryMd = new mongoose.Schema({
    name: String,
    altName: String,
    url: String,
    path: String,
    artist: String,
    // tag:Array,
    uploadedAt: Date,
    publishedAt: Date,
    metadata: Object
});
const kskMeta = mongoose.model("kskArchiveColl", kskGalleryMd);

module.exports = {
    //For Slash Commands
    data: new SlashCommandBuilder()
        .setName('ksk')
        .setDescription('Random Hentai Gen from KSK'),
    async execute(interaction, client) {
        if (!interaction.channel.nsfw) {
            await interaction.reply("Bro it's not foooking NSFW Channel.")
            return
        }
        let kskData = await getRngKsk();
        //console.log(kskData)
        await interaction.reply({ embeds: [await sendEmbed(client, kskData)] })
    },

    //For Prefix
    name: "ksk",
    aliases: ["kskmoe", "koushoku"],
    usage: "",
    category: "nsfw",
    description: "",
    accessableby: "",

    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            await message.channel.send("Bro it's not foooking NSFW Channel.")
            return
        }

        let kskData = await getRngKsk();
        //console.log(kskData)
        try {
            await message.channel.send({ embeds: [await sendEmbed(client, kskData)] })
        } catch (error) {
            await message.channel.send('Something went wrong')
        }


    }
}

async function getRngKsk() {
    let count = await kskMeta.count();
    var rng = Math.floor(Math.random() * count)
    //console.log('Logging RNG for KSK for error debug', rng)
    try {
        return (await kskMeta.findOne().limit(-1).skip(rng))
    } catch (error) {
        console.log(error)
    }

}
async function sendEmbed(client, kskData) {

    const kskEmbed = new EmbedBuilder()
        .setColor('#C32B4E')
        //.setTitle(kskData.name)
        .setURL(kskData.url)
        .setAuthor({ name: kskData.name, iconURL: 'https://ksk.moe/images/cover.jpg', url: 'https://ksk.moe' })
        .addFields({ name: '\u200B', value: '\u200B' })
        .setDescription('\n\n\n' + kskData.altName)
        .setThumbnail(kskData.metadata.thumbnail.url)
        .addFields(
            { name: 'Category', value: kskData.metadata.category, inline: true });
            //{ name: 'Artist', value: kskData.artist, inline: true }); //artist might have some error
    if (kskData.artist) {
        kskEmbed.addFields({ name: 'Artist', value: kskData.artist, inline: true })
    } if (kskData.metadata.circle) {
        kskEmbed.addFields({
            name: 'Circle', value: kskData.metadata.circle.shift(), inline: true
        })
    }
    if (kskData.metadata.magazine) {
        kskEmbed.addFields({
            name: 'Magazine', value: kskData.metadata.magazine, inline: true
        })
    }
    if (kskData.metadata.parody) {
        kskEmbed.addFields({ name: 'Parody', value: kskData.metadata.parody, inline: true })
    }

    kskEmbed.addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Tags', value: kskData.metadata.tags.join(", "), inline: false },
        { name: 'Source', value: kskData.url, inline: false },
    )
        .setImage(kskData.metadata.thumbnail.url)
        .setTimestamp()
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });

    if (kskData.publisher != undefined || kskData.publisher != '') {
        kskEmbed.addFields({
            name: 'Publisher', value: kskData.metadata.publisher, inline: false
        })
    }

    kskEmbed.
        addFields(
            { name: 'Created Date', value: kskData.uploadedAt.toLocaleDateString("default"), inline: true },
            { name: 'Published Date', value: kskData.publishedAt.toLocaleDateString("default"), inline: true },

        )

    return kskEmbed;
}
