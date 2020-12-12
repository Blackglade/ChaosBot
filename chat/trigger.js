const Trigger = require('../models/trigger');
const parseArgs = require('../utils/parseArgs');

const trigger = async (message) => {
	// if(Math.round(Math.random() * 9) !== 6) return;

	const data = await Trigger.find({});
	let result = data.find(text => message.content.includes(text.trigger))

	if(typeof result !== 'undefined'){
		let responses = result.responses
		message.reply(responses[Math.round(Math.random() * (responses.length - 1))])
	}
}

module.exports = trigger;