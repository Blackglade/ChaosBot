const Harass = require('../models/harass.js');

module.exports = {
	name: 'test',
	description: '',
	execute(message, args) {
		console.log(message.mentions.users.first().username)

		const data = new Harass({
			name: message.mentions.users.first().username,
			userID: message.mentions.users.first().id,
			expiry: 'soon'
		})

		data.save();
	},
}