module.exports = {
    name: 'harass',
    description: '',
    execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to harass them!');
        }

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
}