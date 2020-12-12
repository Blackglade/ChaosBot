const mongoose = require('mongoose');

module.exports = mongoose.model('Trigger', mongoose.Schema({
	trigger: {
		type: String,
		required: true
	},
	responses: {
		type: Array,
		required: true
	}
}, { timestamps: true }));