const mongoose = require('mongoose');

module.exports = mongoose.model('Harass', mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	userID: {
		type: String,
		required: true
	},
	expiry: {
		type: String,
		required: true
	}
}, { timestamps: true }));