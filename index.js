const Discord = require('discord.js')
const fs = require('fs');
const mongoose = require('mongoose');

const { token, mongoDB } = require('./config.json');
const chatCommands = require('./chat');
const customCommands = require('./chat/custom');
const { parseArgs } = require('./utils/args');
const { time } = require('console');
const client = new Discord.Client();

const embed = {
	color: 0x0065FF,
	author: { name: "Glade's Chaos Bot Help Menu"},
	thumbnail: { url: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8f/8f92e8c4e7b6220231f33e62139cd991baa41925_full.jpg'}
}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	if(command.cooldown){
		cooldowns.set(command.name, new Discord.Collection())
	}
}

client.once('ready', () => {
	console.log('It\'s alive. ALIVEEEEE');
});

client.on('message', message => {
	if (message.author.bot || message.channel.type === 'dm') return;
	if(!message.content.startsWith('!')){
		chatCommands(message);
		return;
	}

	const args = parseArgs(message.content.trim())
	const command = args.shift().toLowerCase();
	
	customCommands(message, command.slice(1));

	if (!client.commands.has(command)) return;

	try {
		let cmd = client.commands.get(command);

		if(cmd.permission && !message.channel.permissionsFor(message.author).has(cmd.permission)){
			message.reply("you can't use that command!")
			return;
		}

		if(cmd.args && args.length < cmd.args){
			message.channel.send({ embed: {...embed, ...cmd.help} })
			return;
		}
		
		if(cmd.cooldown){
			const timestamps = cooldowns.get(cmd.name)

			if(timestamps.has(message.author.id)){
				let expiry = timestamps.get(message.author.id) + (cmd.cooldown * 3600000);
				if(Date.now() < expiry) return message.reply(cmd.cooldownMsg);
			}

			// Set Timestamp
			timestamps.set(message.author.id, Date.now())
			setTimeout(() => timestamps.delete(message.author.id), cmd.cooldown * 360000)
		}

		cmd.execute(message, args);

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