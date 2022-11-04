import React from "react";
import { useState } from "react";

//TODO We can possibly move the event builder functions to another file

//Convert 12hrs to 24hrs for calendar events
const convertTime = (timeStr) => {
	var time;
	time = timeStr.replace("PM", "");
	time = time.replace("AM", "");
	time = time.replace(" ", "");
	let [hours, minutes] = time.split(":");
	if (hours === "12") {
		hours = "00";
	}
	if (timeStr.includes("PM")) {
		hours = parseInt(hours, 10) + 12;
	}
	return `${hours}:${minutes}`;
};

//Convert day str to corrisponding int id for calendar
const createDaysArray = (daysStr) => {
	var daysAry = [];
	if (daysStr.includes("Mon")) daysAry.push(1);
	if (daysStr.includes("Tues")) daysAry.push(2);
	if (daysStr.includes("Wed")) daysAry.push(3);
	if (daysStr.includes("Thur")) daysAry.push(4);
	if (daysStr.includes("Fri")) daysAry.push(5);

	return daysAry;
};

//Create Lecture EVENT
const createLecEventObj = (data) => {
	let newLec = {};

	var lecTimes = data.lecTime.split("-"); // Remove the split between start and end time
	lecTimes[0] = convertTime(lecTimes[0]); // Convert 12hrs to 24hrs for start time
	lecTimes[1] = convertTime(lecTimes[1]); // Convert 12hrs to 24hrs for end time
	var daysInts = createDaysArray(data.lecDays); // From the days that the lec is on
	var desc = `LEC <br> Prof: ${data.prof} <br> Room: ${data.lecRoom} <br> Sem: ${data.sem} <br> Campus: ${data.campus}`; // Other data from course JSON
	newLec = {
		title: data.name,
		startTime: lecTimes[0],
		endTime: lecTimes[1],
		daysOfWeek: daysInts,
		description: desc,
	};

	return newLec;
};

//Create a LAB/SEM EVENT
const createSemEventObj = (data) => {
	let newLec = {};

	var lecTimes = data.semTime.split("-"); // Remove the split between start and end time
	lecTimes[0] = convertTime(lecTimes[0]); // Convert 12hrs to 24hrs for start time
	lecTimes[1] = convertTime(lecTimes[1]); // Convert 12hrs to 24hrs for end time
	var daysInts = createDaysArray(data.semDay); // From the days that the lec is on

	newLec = {
		title: data.name,
		startTime: lecTimes[0],
		endTime: lecTimes[1],
		daysOfWeek: daysInts,
		description: data.semDay.split(" ")[0], // Often the sem or lab title gets cut off so best to put it here
	};

	return newLec;
};

//Main search component
export default function Search({ addCourse }) {
	const [text, setText] = useState(""); //Textbox usestate
	//On submit button press
	const onSubmit = (e) => {
		e.preventDefault(); // Prevent reload
		if (!text) {
			alert("Please add a course");
			return;
		}

		getCourseInfo(); //API fetch and add to calendar
		setText(""); //reset input field
	};

	const getCourseInfo = () => {
		fetch(`/api/course?name=${text}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				//Includes error handling for DE and no seminar and bad inputs
				if (data.name !== undefined && data.lecTime !== "NULL") {
					addCourse(createLecEventObj(data));
				}
				if (data.name !== undefined && data.semTime !== "NULL") {
					addCourse(createSemEventObj(data));
				}
			});
	};

	return (
		<div className="search-container">
			<form className="add-form" onSubmit={onSubmit}>
				<div className="form-control">
					<input
						type="text"
						placeholder="Enter Course Code"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					value="Load Course"
					className="btn btn-primary"
				/>
			</form>
		</div>
	);
}
