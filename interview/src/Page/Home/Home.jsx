import React from 'react'

import Table from '../../Component/Table/Table'
import {Link, useHistory } from 'react-router-dom'
import "./Home.css"
import { Navbar } from '../../Component/Navbar/Navbar'

export const Home = () => {
  
  return (
    <div className="homeContainer">
      <Navbar/>
      <div className="hero">
        <div className="desc">
          Schedule your interview in one click.
        </div>
        <div className="button">
          <Link className='text-link'  to="/form">Schedule Now</Link>
        </div>
      </div>
      <div className="homeTable">
        <div className="heading">
          UPCOMMING INTERVIEWS
        </div>
        <Table />
      </div>

    </div>
  )
}
