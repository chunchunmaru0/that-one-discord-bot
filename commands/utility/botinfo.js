const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot')
		.setDescription('Display info about this BOT.'),
	async execute(interaction,client) {
		return interaction.reply({ embeds: [sendEmbed(interaction,client)] });
	},
    name: "botinfo",
    aliases: ["b", "bot"],
    usage: "",
    category: "utility",
    description: "Shows the info of this bot",
    accessableby: "",
    run: async (client, message, args) => {

        message.channel.send({ embeds: [sendEmbed(message, client, args)] });

    }
}
function sendEmbed(msgOrInter, client, args) {
    
    let sEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("BOT INFO")
        .setThumbnail(client.user.avatarURL())
        .setAuthor({ name: `${client.user.username} Info`, iconURL: client.user.avatarURL() })
        .addFields(
            { name: "**BOT Name:**", value: client.user.username, inline: true },
            { name: "**BOT Creator:**", value: `<@338357788818276352>`, inline: true },
            { name: "**BOT Name:**", value: client.user.username, inline: true },
            { name: '\u200B', value: '\u200B' },
        )
        .addFields(
            { name: `**GITHUB:**`, value: 'https://github.com/chunchunmaru0/that-one-discord-bot', inline: false },
            { name: "**CREATED AT:**", value: client.user.createdAt.toString(), inline: false },
            { name: "**Ready AT:**", value: client.readyAt.toString(), inline: false },
            { name: "**Uptime:**", value: (client.uptime/1000/60).toString(), inline: false },
            //{ name: "**CREATED AT:**", value: client.guilds.toString(), inline: false },
        )
        .setTimestamp()
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()});
        return sEmbed;
}