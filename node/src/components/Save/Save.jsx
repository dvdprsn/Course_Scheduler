import React from "react";
import { useState } from "react";
import "./Save.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Save({ courses, setCourseData, semType }) {
	const [files, setFiles] = useState("");
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const downloadFile = ({ data, fileName, fileType }) => {
		const blob = new Blob([data], { type: fileType });

		const a = document.createElement("a");
		a.download = fileName;
		a.href = window.URL.createObjectURL(blob);
		const clickEvt = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		a.dispatchEvent(clickEvt);
		a.remove();
	};

	const exportToJson = (e) => {
		e.preventDefault();
		downloadFile({
			data: semType + JSON.stringify(courses),
			fileName: semType + "calendar.json",
			fileType: "text/json",
		});
	};

	const loadCourses = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			setFiles(e.target.result);
		};
	};

	const overwriteCourses = () => {

		if(files.charAt(0) == semType[0]){
			setShow(false);
			setCourseData([]);
			setCourseData(JSON.parse(files.slice(3)));
			setFiles("");
		} else {
			window.alert("Cannot load this file to calendar " + semType);
		}
	};

	return (
		<div className="upBtns">
			<Button variant="outline-success" onClick={handleShow}>
				Load
			</Button>

			<Button
				id="saveBtn"
				variant="outline-danger"
				onClick={exportToJson}
			>
				Save
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>File Upload</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Upload Calendar JSON</Form.Label>
						<Form.Control type="file" onChange={loadCourses} />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={overwriteCourses}>
						Upload
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
