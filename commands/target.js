const Target = require('../models/target.js');
const {printArgs} = require('../utils/args');

module.exports = {
	name: '!target',
	help: {
		title: '!target',
		description: 'Sets a chat target to randomly respond to a user. 1% chance of triggering.',
		fields: [
			{name: 'Usage:', value: '!target <userID> "<response1>" "<response2>"'},
			{name: 'Arguments:', value: '`userID`: The id of the user to put a target on.\n `response`: The bot will respond with a randomly selected response. There is no response limit.'},
			{name: 'Remove:', value: '`!target remove <userID>` will remove all chat targets on the user'},
			{name: 'View:', value: '`!target view <userID>` displays all chat targets on the user.'}
		]
	},
	permission: 'MANAGE_MESSAGES',
	args: 2,
	execute(message, args) {
		const command = args[0];
		args.shift();

		if(command === 'remove'){
			Target.findOneAndDelete({userID: args[0]}, (err) => {
				if(err) console.log(err);
				message.channel.send(`User \`${args[0]}\`'s chat target was deleted!`);
			});

			return;
		} else if(command === "view") {
			Target.findOne({userID: args[0]}, (err, docs) => {
				if(err) console.log(err);
				if(!docs) return message.channel.send(`There are no targets for the user \`${args[0]}\``);

				return message.channel.send(`Here are the responses for user \`${args[0]}\`: ${printArgs(docs.responses)}`)
			})
		} else {
			Target.findOneAndUpdate(
				{userID: command},
				{responses: args},
				{upsert: true, new: true},
				(err, docs) => {
					if(err) console.log(err);
					return message.channel.send(`Messages from \`${command}\` will now trigger the following responses: ${printArgs(args)}`);
			});
		}
	},
}