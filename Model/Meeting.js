const mongoose = require('mongoose');
const MeetingSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Meeting title required"],
	},
	users:[
		//array of userID
		//no i have written code for it document.querySelector);
		// we can use query of mongoDB
		// we can make a array in userSchema which contain all the meeting it will have.
		// when the user is added to the meeting 
		{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	],
	startTime:{
		type:Date,
		required:[true,"start time required"]
	},
	endTime:{
		type:Date,
		required:[true,"end time required"]
	}
}, { timestamps: true })

module.exports = mongoose.model("Meeting", MeetingSchema);