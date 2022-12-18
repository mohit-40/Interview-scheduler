const mongoose= require('mongoose');
const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,"product name required"],
	},
	email:{
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: [true, "Email required"],
	},
	admin:{
		type: Boolean,
		default: false
	}
},{ timestamps:true })

module.exports=mongoose.model("User",UserSchema);