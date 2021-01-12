const mongoose = require('mongoose');

module.exports = mongoose.model('Inventory', mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	crabs: {
		type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true }));