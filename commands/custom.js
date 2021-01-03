const Custom = require('../models/custom.js');
const {parseArgs, printArgs} = require('../utils/args');
const { restrictedRoleName } = require('../config.json');

module.exports = {
	name: 'custom',
	description: 'Custom Commands. Usage <!custom <voice or text> <keyword> response',
	execute(message) {
		if(!message.member.roles.cache.find(role => role.name === restrictedRoleName)){
			return message.reply("You can\'t use that command!")
		}
		// !custom <voice or text> 
		let args = parseArgs(message.content.slice(8).trim())
		if(args.length > 3){
			return message.channel.send("Please use the proper command format. `!custom <voice or text> <keyword> response");
		}
		
		const type = args[0];
		const command = args[1];

		if(type === 'remove'){
			Custom.findOneAndDelete({command: command}, (err) => {
				if(err) console.log(err);
				message.channel.send(`The custom command \`${command}\` was deleted!`);
			});
		} else {
			Custom.findOneAndUpdate(
				{type: type, command: command},
				{response: args[2]},
				{upsert: true, new: true},
				(err) => {
					if(err) console.log(err);
					return message.channel.send(`The ${type} command \`${command}\` will now trigger the following response: ${args[2]}`);
			});
		}
	},
}