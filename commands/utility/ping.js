const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		
		return interaction.reply('Test Pong from Slash!',);
	},
	name: "ping",
	aliases: ["p", "ping"],
	usage: "",
	category: "utility",
	description: "Replies with Pong!",
	accessableby: "",
	run: async (client, message, args) => {
		message.channel.send("Test Pong from Prefix!");
	}

};