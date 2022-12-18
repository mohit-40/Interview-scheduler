import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../asset/logo.jpg"
import "./Navbar.css"

export const Navbar = () => {
	const [search,setSearch] = useState("");
	
	return (
		<div className="navContainer">
			<div className="left">
				<div className="logo">
					<img src={logo} alt="." />
				</div>
				<div className="name">
					<Link className='text-link' to="/">Scheduler</Link>
				</div>
				<div className="searchbar">
					<input type="text"  onChange={(e)=>setSearch(e.target.value)}/>
				</div>
			</div>
		</div>
	)
}
