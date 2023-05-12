const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { RedditAPI } = require('../../reddit-wrapper/reddit.js')
module.exports = {
    //For Slash Commands
    data: new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('nsfw '),
    async execute(interaction, client) {
        await interaction.reply("nsfw")
    },

    //For Prefix
    name: "nsfw",
    aliases: [],
    usage: "",
    category: "",
    description: "",
    accessableby: "",

    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            await message.channel.send("Bro it's not foooking NSFW Channel.")
            return
        }
        
        try {
            let sendLink = (await getNsfw());
            if (sendLink.error) {
                console.log("Error");
                return
            }
            await message.channel.send(sendLink.url);
        } catch (error) {
            console.log(error)
        }
        
    }
}

async function getNsfw() {
    let getReddit = new RedditAPI;

    try {
        let redditRes = await getReddit.real.general();
        if (redditRes.error) {
            console.log('err')
            return getNsfw();

        };
        return (redditRes);
    } catch (error) {
        console.log(error)
    }

}