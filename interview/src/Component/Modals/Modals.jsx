import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Modals.css"

export const Modals = (props) => {
	const addUser = (user) => {
		props.setSelectedUser((prev) => {
			if (prev.find((u)=> u._id == user._id)) {
				return (prev.filter((ele) => ele._id !== user._id));
			}
			else {
				return ([...prev, user]);
			}
		})
	}
	return (
		<>
			<Modal {...props} scrollable={true}>
				<Modal.Header closeButton>
					<Modal.Title>{props.heading}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{
						props.users.map((user) => {
							return (
								<div className={props.selectedUser.find((u)=> u._id==user._id) ? "userDetail userLight":"userDetail" } onClick={() => addUser(user)} >
									<span className="name" >{user.name}</span>
									<span className="email">{user.email}</span>
								</div>
							)
						})
					}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}