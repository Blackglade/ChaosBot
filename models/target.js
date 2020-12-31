const mongoose = require('mongoose');

module.exports = mongoose.model('Target', mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	responses: {
		type: Array,
		required: true
	}
}, { timestamps: true }));