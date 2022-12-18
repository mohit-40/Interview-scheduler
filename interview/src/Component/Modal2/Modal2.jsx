import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export const Modal2 = (props) => {
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
								<div className="userDetail" >
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