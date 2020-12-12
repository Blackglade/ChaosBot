const trigger = require('./trigger');

const chatCommands = (message) => {
	trigger(message);
}

module.exports = chatCommands;