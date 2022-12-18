//jshint esversion:6 
//!/* ---------------------------- include pakage --------------------------- */
const dotenv=require('dotenv').config();
const express=require("express");
const app=express();
const mongoose=require('mongoose');
const morgan = require("morgan");
const cors = require("cors");

//!including route file
const meetingRoute=require('./Routes/Meeting');
const userRoute=require('./Routes/User');
const port=process.env.PORT||8800;

//!/* -------------------------------- mongoose -------------------------------- */
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to mongodb")).catch((err)=>console.log(err.message));

//!/* ------------------------------- middleware ------------------------------- */
app.use(express.json())
app.use(cors());

//!/* ---------------------------------- Route --------------------------------- */
app.use("/api/meeting",meetingRoute);
app.use("/api/user",userRoute);

//! /* ----------------------------- setting static ----------------------------- */

	console.log("in production")
	const path = require("path")
	app.use(express.static(path.join(__dirname, "/interview/build")));
	
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '/interview/build', 'index.html'));
	});

//!/* ---------------------------- listening to port --------------------------- */
app.listen(port , ()=>{
	console.log("server running on port "+port );
});
