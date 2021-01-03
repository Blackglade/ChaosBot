const Target = require('../models/target.js');
const {parseArgs, printArgs} = require('../utils/args');
const { restrictedRoleName } = require('../config.json');
const trigger = require('../models/trigger.js');

module.exports = {
	name: 'target',
	description: 'Chat Targets. Usage <!target <userID> response1, response2, response3',
	execute(message) {
		if(!message.member.roles.cache.find(role => role.name === restrictedRoleName)){
			return message.reply("You can\'t use that command!")
		}

		let args = parseArgs(message.content.slice(8).trim())
		if(args.length < 2){
			return message.channel.send("Please use the proper command format. `!target **<userID>** response1 \"response number  2\" \"response3\"`. \nTo remove a trigger, use the keyword remove (ie: `!target remove <userID>`)\n To view current responses for a target, use the keyword view (ie: !target view <userID>");
		}

		const command = args[0];
		args.shift();

		if(command === 'remove'){
			Target.findOneAndDelete({userID: args[0]}, (err) => {
				if(err) console.log(err);
				message.channel.send(`User \`${args[0]}\`'s chat target was deleted!`);
			});

			return;
		}else if(command === "view") {
			Target.findOne({userID: args[0]}, (err, docs) => {
				if(err) console.log(err);
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