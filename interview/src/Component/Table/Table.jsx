import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import "./Table.css";
import { Modal2 } from '../Modal2/Modal2';
import moment from "moment";
import { publicRequest } from '../../requestMethod';

export default function Table() {
	const [modalShow, setModalShow] = useState(false);
	const [users,setUsers] = useState([]);
	const [meeting, setMeeting] = useState([]);
	useEffect(() => {
		const fetchMeeting = async () => {
			try {
				const res = await publicRequest.get("/meeting/")
				let result = res.data.map((m) =>  {
					return {
						...m,
						startTime: moment(m.startTime).utc().format('MMMM Do YYYY, h:mm a'), 
						endTime: moment(m.endTime).utc().format('MMMM Do YYYY, h:mm a')
					}
				})
				setMeeting(result);

			} catch (error) {
				console.log(error?.response?.data?.data);
			}
		}
		fetchMeeting();
	}, []);


	const handleDelete = async (id) => {
		try {
			// i am using the axios 
			await publicRequest.delete(`/meeting/${id}`);
			setMeeting(meeting.filter((u) => u._id !== id));
		} catch (error) {
			console.log(error?.response?.data?.data);
		}
	};


	/*//! -----------------------------------  ---------------------------------- */
	const columns = [
		{
			field: '_id',
			headerName: 'ID',
			width: 150,
			sortable: false, disableColumnMenu: true
		},
		{
			field: "title",
			headerName: "Meeting Name",
			width: 300,
			sortable: false, disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<div className='tableMeeting'>
						{params.row.title}
					</div>
				);
			},
		},
		{ field: 'startTime', headerName: 'Start Time', type: 'Date', width: 200, sortable: false, disableColumnMenu: true },
		{ field: 'endTime', headerName: 'End Time', type: 'Date', width: 200, sortable: false, disableColumnMenu: true },
		{
			field: 'action2', headerName: 'Participant', width: 200,
			sortable: false, disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<>
						<div onClick={()=>{setUsers(params.row.users); setModalShow(true);} } style={{color: "blue", cursor:"pointer"}}>View all</div>
					</>
				)
			}
		},
		{
			field: 'action', headerName: 'Action', width: 150,
			sortable: false, disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/form?id=" + params.row._id} > <button className='tableButton'>Edit</button> </Link>
						<DeleteOutline style={{ cursor: "pointer" }} onClick={() => handleDelete(params.row._id)} />
					</>
				)
			}
		},
	];

	/*//! -----------------------------------  ---------------------------------- */

	return (
		<div className='table' style={{ height: '50vh', width: '100%' }}>
			{
				meeting.length === 0 ? "No scheduled interview" :
					<DataGrid
						rows={meeting}
						columns={columns}
						pageSize={5}
						getRowId={(row) => row._id}
						rowsPerPageOptions={[5]}
					/>
			}
			<Modal2 show={modalShow} onHide={() => setModalShow(false)}  users={users} heading="View participants..." />
		</div>
	);
}