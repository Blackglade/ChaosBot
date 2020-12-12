const Trigger = require('../models/trigger.js');
const parseArgs = require('../utils/parseArgs');
const { restrictedRoleName } = require('../config.json');

module.exports = {
	name: 'trigger',
	description: 'Chat Triggers. Usage <!trigger <trigger_text> response1, response2, response3',
	execute(message) {
		if(!message.member.roles.cache.find(role => role.name === restrictedRoleName)){
			return message.reply("You can\'t use that command!")
		}

		let args = parseArgs(message.content.slice(9).trim())
		if(args.length < 2){
			return message.reply("Please use the proper command format. `!trigger **<trigger_text>** response1 \"response number  2\" \"response3\"`. \nTo remove a trigger, use the keyword remove (ie: `!trigger remove <trigger_name>`)");
		}

		const keyword = args[0].toLowerCase();
		args.shift();

		if(keyword === 'remove'){
			Trigger.findOneAndDelete({trigger: args[0]}, (err) => {
				if(err) console.log(err);
				message.reply(`The chat trigger \`${args[0]}\` was deleted!`);
			});

			return;
		}

		Trigger.findOneAndUpdate(
			{trigger: keyword},
			{responses: args},
			{upsert: true, new: true},
			(err) => {
				if(err) console.log(err);
				return message.reply(`The chat trigger \`${keyword}\` was applied`);
		});
	},
}