const { Client, Events, Collection, Partials, GatewayIntentBits } = require('discord.js');;
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { execute } = require('./commands/utility/ping');


dotenv.config();

//import { token } from './config.json';
const token = process.env.DISCORD_TOKEN;
// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	]
}); //{ intents: [GatewayIntentBits.Guilds] }

client.commands = new Collection();
client.aliases = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		
		//client.commands.set(command.name, command);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
		
	}
}


client.once(Events.ClientReady, () => {
	console.log('Ready!');
});


client.on('messageCreate', async message => {

	if (!message.content.startsWith('$')) return


	let args = message.content.slice('$'.length).trim().split(/ +/g);
	let cmd = args.shift().toLowerCase();



	let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

	//console.log(commandfile)
	
	if (commandfile) commandfile.run(client, message, args)


});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction,client);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
client.login(token);