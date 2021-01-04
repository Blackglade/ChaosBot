const Trigger = require('../models/trigger.js');
const {printArgs} = require('../utils/args');
const { restrictedRoleName } = require('../config.json');

module.exports = {
	name: '!trigger',
	help: {
		title: '!trigger',
		description: 'Sets a chat trigger to randomly respond when a certain `keyword` is detected. 10% chance of triggering.',
		fields: [
			{name: 'Usage:', value: '!trigger <keyword> "<response1>" "<response2>"'},
			{name: 'Arguments:', value: '`keyword`: The bot will look for this word in any message before initiating a trigger.\n `response`: The bot will respond with a randomly selected response. There is no response limit.'},
			{name: 'Remove:', value: '`!trigger remove <keyword>` will remove the trigger'}
		]
	},
	permission: 'MANAGE_MESSAGES',
	args: 2,
	execute(message, args) {
		const keyword = args[0].toLowerCase();
		args.shift();

		if(keyword === 'remove'){
			Trigger.findOneAndDelete({trigger: args[0]}, (err) => {
				if(err) console.log(err);
				message.channel.send(`The chat trigger \`${args[0]}\` was deleted!`);
			});

			return;
		} else {
			Trigger.findOneAndUpdate(
				{trigger: keyword},
				{responses: args},
				{upsert: true, new: true},
				(err) => {
					if(err) console.log(err);
					return message.channel.send(`\`${keyword}\` will now trigger the following responses: ${printArgs(args)}`);
			});
		}
	},
}