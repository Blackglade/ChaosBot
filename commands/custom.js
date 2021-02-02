const Custom = require('../models/custom.js');
const { printArgs } = require('../utils/args.js');

module.exports = {
	name: '!custom',
	help: {
		title: '!custom',
		description: 'Creates a custom voice or text command.',
		fields: [
			{name: 'Usage:', value: '!custom <type> <command> <response>'},
			{name: 'Arguments:', value: "`type`: The two valid types are *voice* and *text*. Voice will join the user's server and text will just message the channel.\n `command`: The name of the command.\n `response`: The response of the command. For voice, it can be any mp3/mp4 file or a youtube link. For text, it can be any text/image/link."},
			{name: 'Remove:', value: '`!custom remove <command>` will remove the custom command'}
		]
	},
	permission: 'MANAGE_MESSAGES',
	args: 2,
	execute(message, args) {
		const type = args[0];
		const command = args[1];

		if(type === 'remove'){
			Custom.findOneAndDelete({command: command}, (err) => {
				if(err) console.log(err);
				message.channel.send(`The custom command \`${command}\` was deleted!`);
			});
		} else if(type === 'view'){
				Custom.find({type: command}, (err, doc) => {
					if(err) console.log(err)
					let customCommands = doc.reduce((acc, cv) => acc.push('!' + cv.command) && acc, []);
					message.channel.send(`Here are the following custom ${command} commands: ${printArgs(customCommands)}`)
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