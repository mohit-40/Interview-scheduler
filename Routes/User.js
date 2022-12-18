const router = require('express').Router();
const Meeting = require("../Model/Meeting");
const User = require("../Model/User");

//create user
router.post("/",async(req,res)=>{
	try {
		const newUser= await new User(req.body);
		const user = await newUser.save();
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json(error.message)
	}
})
// delete user
router.delete("/:userId", async(req,res)=>{
	try {
		await User.findByIdAndDelete(req.params.userId);
		res.status(200).json("user deleted");
	} catch (error) {
		res.status(400).json(error.message);		
	}
})
// get all user
router.get("/",async(req,res) =>{
	try {
		const user= await User.find();
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json(error.message)
	}
})
//get particular user
router.get("/:userId",async(req,res)=>{
	try{
		const user=await User.findById(req.params.userId);
		res.status(200).json(user);
	}
	catch(error){
		res.status(400).json(error.message);
	}
})



module.exports=router;