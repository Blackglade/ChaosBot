const mongoose = require('mongoose');

module.exports = mongoose.model('Custom', mongoose.Schema({
	type: {
		type: String,
		required: true
    },
    command: {
        type: String,
        required: true
    },
	response: {
		type: String,
		required: true
	}
}, { timestamps: true }));