const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require('discord.js');


module.exports = {

	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with User Details!'),
		async execute(interaction,client) {
			//console.log(interaction,client)
			await interaction.reply({ embeds: [sendEmbed(interaction,client)] });
		},

	name: "user",
	aliases: ["ui", "userinfo"],
	usage: ' `/user`',
	category: "general",
	description: "Shows the info of user",
	accessableby: "All",

	run: async (client, message, args) => {
		/*
					This is Old
		
					const sEmbed = new EmbedBuilder()
					.setColor('#0099ff')
					.setTitle("User Info")
					
					.setThumbnail(message.author.displayAvatarURL)
					.setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
					.addField("**Username:**", `${message.author.username}`, true)
					.addField("**Discriminator:**", `${message.author.discriminator}`, true)
					.addField("**ID:**", `${message.author.id}`, true)
					.addField("**Status:**", `${message.author.presence.status}`, true)
					.addField("**Created At:**", `${message.author.createdAt}`, true)
					.setTimestamp()
					.setFooter(`${message.guild.me.displayName}`, client.user.displayAvatarURL);
					//message.channel.send({embeds: [sEmbed]});
		*/

		//console.log(client.user.avatarURL())
		
		// const exampleEmbed = new EmbedBuilder()
		// 	.setColor(0x0099FF)
		// 	.setTitle('User Info')
		// 	.setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
		// 	.setThumbnail(message.author.avatarURL())
		// 	.addFields(
		// 		{ name: "**Username:**", value: message.author.username },
		// 		{ name: "**Discriminator:**", value: message.author.discriminator, inline: true },
		// 		{ name: "**ID:**", value: message.author.id, inline: true },
		// 		{ name: "**Created At:**", value: (message.author.createdAt).toString(), inline: false },

		// 	)
		// 	.setTimestamp()
		// 	.setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });

		message.channel.send({ embeds: [sendEmbed(message,client,args)] });


	},



}

function sendEmbed(msgOrInter,client,args){
	let user = msgOrInter.author || msgOrInter.user
	const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('User Info')
	.setAuthor({ name: user.username, iconURL: user.avatarURL() })
	.setThumbnail(user.avatarURL())
	.addFields(
		{ name: "**Username:**", value: user.username },
		{ name: "**Discriminator:**", value: user.discriminator, inline: true },
		{ name: "**ID:**", value: user.id, inline: true },
		{ name: "**Created At:**", value: (user.createdAt).toString(), inline: false },

	)
	.setTimestamp()
	.setFooter({ text: client.user.username, iconURL: client.user.avatarURL()});

	return exampleEmbed;
}