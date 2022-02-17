const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		name: {
			type: 'string',
			required: [true, 'Please enter a name'],
		},
		email: {
			type: 'string',
			required: [true, 'Please enter an email'],
			unique: true,
		},
		password: {
			type: 'string',
			required: [true, 'Please enter a password'],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('User', userSchema)
