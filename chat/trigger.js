const Trigger = require('../models/trigger');

const trigger = async (message) => {

	const data = await Trigger.find({});
	let msg  = message.content.toLowerCase();
	let result = data.find(text => msg.includes(text.trigger))

	if(typeof result !== 'undefined'){
		if(Math.round(Math.random() * 9) !== 6) return;
		
		let responses = result.responses
		message.reply(responses[Math.round(Math.random() * (responses.length - 1))])
	}
}

module.exports = trigger;