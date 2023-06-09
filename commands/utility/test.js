const { AttachmentBuilder, EmbedBuilder,SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test '),
	async execute(interaction,client) {

        // ...
        const file = new AttachmentBuilder('https://media.discordapp.net/attachments/609551120385310751/1103869703660773446/6mp2lr192xwa1.jpg');
        const exampleEmbed = new EmbedBuilder()
            // .setTitle('Some title')
            //.setImage('https://media.discordapp.net/attachments/609551120385310751/1103869703660773446/6mp2lr192xwa1.jpg');
            .setImage('attachment://6mp2lr192xwa1.jpg');

            await interaction.deferReply({ ephemeral: false });
        //await interaction.editReply({  embeds: [exampleEmbed]});


        await interaction.editReply({ embeds: [exampleEmbed], files: [file] });
	},
}