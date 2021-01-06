const Target = require('../models/target');

const target = async (message) => {
    const data = await Target.find({});
    let result = data.find(msg => msg.userID === String(message.author.id))

	if(Math.round(Math.random() * 100) !== 42) return;

	if(typeof result !== 'undefined'){
		let responses = result.responses
		message.reply(responses[Math.round(Math.random() * (responses.length - 1))])
	}
}

module.exports = target;