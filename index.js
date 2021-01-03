const Discord = require('discord.js')
const fs = require('fs');
const mongoose = require('mongoose');

const { prefix, token, mongoDB } = require('./config.json');
const chatCommands = require('./chat');
const customCommands = require('./chat/custom');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('It\'s alive. ALIVEEEEE');
});

client.on('message', message => {
	if (message.author.bot) return;
	if(!message.content.startsWith(prefix)){
		chatCommands(message);
		return;
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	customCommands(message, command);

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


mongoose.connect(mongoDB, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(() => client.login(token)).catch((err) => console.log(err))