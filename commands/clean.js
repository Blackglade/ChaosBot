module.exports = {
	name: '!clean',
	help: {
		title: '!clean',
		description: 'Cleans messages from the current channel.',
		fields: [
			{name: 'Usage:', value: '!clean <command> <arguments>'},
			{name: 'Commands:', value: "`!clean messages 30` will delete the last 30 messages\n `!clean @<tag user> 30` will delete the last 30 messages from the tagged user\n `!clean messages "},
		]
	},
	permission: 'MANAGE_MESSAGES',
	args: 2,
	async execute(message, args) {

		const command = args[0];
		let total = parseInt(args[1]);
		let member = message.mentions.members.first()

		if(command === 'messages'){
				message.channel.bulkDelete(total + 1)
		} else if(member){
			while(total){
				let result = (await message.channel.messages.fetch({limit: 100})).array().filter(msg => msg.author.id === member.user.id).slice(0, total);
				total -= result.length;
				message.channel.bulkDelete(result);
			}
		}
	}
}