const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction,client) {
		return interaction.reply({ embeds: [sendEmbed(interaction,client)] });
	},
	name: "server",
	aliases: ["sarvarr", "serv"],
	usage: "",
	category: "utility",
	description: "Shows the info of Server",
	accessableby: "",

	run: async (client, message, args) => {
		message.channel.send({ embeds: [sendEmbed(message,client,args)] });
	}
};

function sendEmbed(msgOrInter,client,args){
	let guild = msgOrInter.guild;

	//console.log(guild.rulesChannel.name)
	const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle("Server Name")
	.setThumbnail(guild.iconURL())
	.setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL() })
	.addFields(
		{ name: " ", value: guild.name },
		 {name: "**Member Count:**", value: (guild.memberCount).toString(), inline: true},
		 { name: "**Created At:**", value: (guild.createdAt).toString(), inline: true },
		 { name: "**Rules:**", value: (`#${guild.rulesChannel.name}`), inline: true },
	)
         .setTimestamp()
         .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()});


	return exampleEmbed;
}