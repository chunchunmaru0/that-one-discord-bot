/*
const { EmbedBuilder,SlashCommandBuilder } = require('discord.js');

module.exports = {
    //For Slash Commands
	data: new SlashCommandBuilder()
		.setName('sample')
		.setDescription('sample '),
	async execute(interaction,client) {
        await interaction.reply("Sample")
    },

    //For Prefix
    name: "sample",
	aliases: ["sample", "s"],
	usage: "",
	category: "",
	description: "",
	accessableby: "",

	run: async (client, message, args) => {
		message.channel.send("Sample");
	}
}
*/

/*
//Embed Sample
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

*/

/*
//Using an Embed Object
const exEmbed = {
	color: 0x0099ff,
	title: 'Some title',
	url: 'https://discord.js.org',
	author: {
		name: 'Some name',
		icon_url: 'https://i.imgur.com/AfFp7pu.png',
		url: 'https://discord.js.org',
	},
	description: 'Some description here',
	thumbnail: {
		url: 'https://i.imgur.com/AfFp7pu.png',
	},
	fields: [
		{
			name: 'Regular field title',
			value: 'Some value here',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
	],
	image: {
		url: 'https://i.imgur.com/AfFp7pu.png',
	},
	timestamp: new Date().toISOString(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/AfFp7pu.png',
	},
};

*/

