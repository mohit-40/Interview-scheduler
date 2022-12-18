import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../../Component/Navbar/Navbar'
import CloseIcon from '@mui/icons-material/Close';
import "./Form.css"
import { Modals } from '../../Component/Modals/Modals';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import moment from "moment"
import { publicRequest } from '../../requestMethod';

export const Form = () => {
  let params = new URLSearchParams(window.location.search); 
  let meetingId = params.get("id");
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [users,setUsers] = useState([]);
  
  const [meeting,setMeeting] = useState({});
  const [selectedUser, setSelectedUser] = useState([]);
  const title = useRef();
  const startTime = useRef();
  const endTime = useRef();

  useEffect(()=>{
    const fetchMeeting=async()=>{
      try {
        const res = await publicRequest.get("/meeting/"+meetingId)
        setMeeting(res.data); 
        setSelectedUser(res.data.users)
      } catch (error) {
        alert(error?.response?.data?.data);
      }
    }
    meetingId && fetchMeeting();
  },[])

  const deleteUser = (id)=>{
    setSelectedUser((prev)=>{
      return(prev.filter((u)=>u!==id));
    })
  }

  
  const handleChoose= async()=>{
    setModalShow(true);
    try {
      const res = await publicRequest.get("/user/");
      setUsers(res.data);
    } catch (error) {
      alert(error?.response?.data?.data);
    }
    console.log(new Date());
  }
  
  const handleSubmit=async()=>{
    try {
      let data={
        users: selectedUser.map((u)=>u._id),
        title:title.current.value,
        startTime:startTime.current.value,
        endTime:endTime.current.value
      }
      if(meetingId){
        const res = await publicRequest.put("/meeting/"+meetingId,data);
        alert("updated successfully");
        navigate("/"); 
      }
      else{
        const res = await publicRequest.post("/meeting/",data);
        alert("Created successfully");
        navigate("/"); 

      }
    } catch(error) {
      console.log(error.response);
      // error.response.data = { error: "collide", desc: "Following users are busy at mention time", users: arr }
      // error.response.data = { error: "time", desc: "Start time should be more than the current time" }
		  {error.response.data.error === "collide" ? alert(error.response.data.desc+" "+error.response.data.users) : alert(error.response.data.desc)}
      
    }
  }

  return (
    <div className='formOutside'>
      <Navbar />
      <div className="form">
        <div className="formContainer">
          <div className="heading">Schedule interview Now...</div>
          <input className="title" type="text" placeholder='Meeting title'  defaultValue={meeting?.title} ref={title} required/>
          <div className='timeContainer'>
            <div className="time">
              <label for="startTime">Start Time  :</label>
              <input type="datetime-local" defaultValue={meeting?.startTime?.slice(0, -1)} ref={startTime}   min={new Date()} required />
            </div>
            <div className="endTime">
              <label for="endTime">End Time  :</label>
              <input type="datetime-local" id="endTime" name="endTime" defaultValue={meeting?.endTime?.slice(0, -1)}  ref = {endTime} required/>
            </div>
          </div>

          <div className="userContainer">
            Participant..
            <div className="userWrapper">
              
              {
                selectedUser.length==0? <div className='noPar'>No participant selected..</div>:
                selectedUser.map((u)=>{
                  return(
                    <div className="user">{u.name} <span className='icon'><CloseIcon style={{ fontSize: 15 }} onClick={()=>deleteUser(u)} /></span></div>
                  )
                })
              }
            </div>
            <button onClick={()=> handleChoose()} className="chooseBtn">Choose participant</button>
            <Modals show={modalShow} onHide={() => setModalShow(false)}  users={users} heading="Choose participants..." setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
          </div>
          <div className="chooseContainer">
            <button className='submit' onClick={()=>handleSubmit()}> { meetingId ? "Update meeting": "Create Meeting"} </button>
          </div>
        </div>
      </div>
    </div>
  )
}
