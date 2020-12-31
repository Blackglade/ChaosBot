const trigger = require('./trigger');
const target = require('./target');

const chatCommands = (message) => {
	target(message);
	trigger(message);
}

module.exports = chatCommands;