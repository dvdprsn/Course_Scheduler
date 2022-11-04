import React, { useState, useEffect } from "react";
// import { Tooltip } from "bootstrap";
// import logo from "./lantern.svg";
import Calendar from "./components/Calendar/Calendar"
import Search from "./components/Search/Search"
import "./App.css";

function App() {
	// const [course = "N/A", setCourseData] = useState(0);
	// const [currentTime, setCurrentTime] = useState(0);

		
	// 	useEffect(() => {
		//Convert 12hrs to 24hrs
		// const convertTime = (timeStr) => {
		// 	var time;
		// 	time = timeStr.replace("PM", "");
		// 	time = time.replace("AM", "");
		// 	time = time.replace(" ", "");
		// 	let [hours, minutes] = time.split(":");
		// 	if (hours === "12") {
		// 		hours = "00";
		// 	}
		// 	if (timeStr.includes("PM")) {
		// 		hours = parseInt(hours, 10) + 12;
		// 	}
		// 	return `${hours}:${minutes}`;
		// };
		// //Convert day str to corrisponding int id for calendar
		// const createDaysArray = (daysStr) => {
		// 	var daysAry = [];
		// 	if (daysStr.includes("Mon")) daysAry.push(1);
		// 	if (daysStr.includes("Tues")) daysAry.push(2);
		// 	if (daysStr.includes("Wed")) daysAry.push(3);
		// 	if (daysStr.includes("Thur")) daysAry.push(4);
		// 	if (daysStr.includes("Fri")) daysAry.push(5);
		
		// 	return daysAry;
		// };
		// //CREATE Lecture EVENT
		// const createLecEventObj = (data) => {
		// 	let newLec = {};
		
		// 	var lecTimes = data.lecTime.split("-"); // Remove the split between start and end time
		// 	lecTimes[0] = convertTime(lecTimes[0]); // Convert 12hrs to 24hrs for start time
		// 	lecTimes[1] = convertTime(lecTimes[1]); // Convert 12hrs to 24hrs for end time
		// 	var daysInts = createDaysArray(data.lecDays); // From the days that the lec is on
		// 	var desc = `Prof: ${data.prof} <br> Room: ${data.lecRoom}`; // TODO Finish adding data to the tooltip
		// 	newLec = {
		// 		title: data.name + " Lec",
		// 		startTime: lecTimes[0],
		// 		endTime: lecTimes[1],
		// 		daysOfWeek: daysInts,
		// 		description: desc,
		// 	};
		
		// 	return newLec;
		// };
		//Create a LAB/SEM EVENT
		// const createSemEventObj = (data) => {
		// 	let newLec = {};
		
		// 	var lecTimes = data.semTime.split("-"); // Remove the split between start and end time
		// 	lecTimes[0] = convertTime(lecTimes[0]); // Convert 12hrs to 24hrs for start time
		// 	lecTimes[1] = convertTime(lecTimes[1]); // Convert 12hrs to 24hrs for end time
		// 	var daysInts = createDaysArray(data.semDay); // From the days that the lec is on
		
		// 	newLec = {
		// 		title: data.name + " " + data.semDay.split(" ")[0],
		// 		startTime: lecTimes[0],
		// 		endTime: lecTimes[1],
		// 		daysOfWeek: daysInts,
		// 		description: "",
		// 	};
		
		// 	return newLec;
		// };
		
		// document.addEventListener("DOMContentLoaded", function () {
		// 	//Testing course EXAMPLE - REMOVE
		// 	let zcourse = {
		// 		title: "CIS*3760*0101 Lec",
		// 		startTime: "09:00", // 24hrs
		// 		endTime: "10:20", // 24hrs 
		// 		daysOfWeek: [1, 3, 5], // mon = 1, wed = 3, fri = 5
		// 		color: " #85929e", // Add bg color
		// 		description: "Example <br> Course", // MUST HAVE A DESC CANNOT BE EMPTY
		// 	};
		
		// 	var calendarEl = document.getElementById("calendar");
		// 	//Create calendar object
		// 	var calendar = new Calendar(calendarEl, {
		// 		plugins: [timeGridPlugin],
		// 		initialView: "timeGridWeek",
		// 		hiddenDays: [0, 6], // Hide weekends
		// 		eventDidMount: function (info) {
		// 			// Mouse hover tooltip function
		// 			new Tooltip(info.el, {
		// 				title: info.event.extendedProps.description, // TODO ? Error handle, not sure how to do this
		// 				placement: "top",
		// 				trigger: "hover",
		// 				html: true, // So <br> creates new line
		// 				container: "body",
		// 			});
		// 		},
		// 		//TODO consider https://fullcalendar.io/docs/eventOverlap
		// 	});
		// 	//TODO to clear calendar https://stackoverflow.com/questions/56647783/fullcalendar-v4-clear-all-events or reload
		// 	calendar.addEvent(zcourse); // IMPORTANT FOR DYNAMIC ADDING
		
		// 	document.getElementById("getCourse").onclick = function () {
		// 		fetch(
		// 			"/api/course?name=" + document.getElementById("desiredCourse").value
		// 		)
		// 			.then((res) => res.json())
		// 			.then((data) => {
		// 				if (data.name !== undefined && data.lecTime !== "NULL") {
		
		// 					calendar.addEvent(createLecEventObj(data)); // Add new lecture
		// 					//TODO Check that a sem actually exists
		// 					calendar.addEvent(createSemEventObj(data)); // Add seminar
		// 				}
		// 			});
		// 	};
		// 	calendar.render();
		// 	//TODO Integrate with bootstrap
		// 	//TODO Handle user inputs
		// 	//TODO Reorganization of UI
		// 	//TODO error handling
		// 	//TODO Event overlap handling
		// 	//TODO Clear calendar button
		// 	//TODO cleanup existing website
		// 	//TODO Add limit to courses added
		// 	//TODO ? Course color coding - Assign random hex color code to each course - reserve red for conflict
		// });

	// 	fetch("/api/time")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setCurrentTime(data.time);
	// 		});
	// }, []);

	// gets passed as prop to Calendar
	const [courses, setCourseData] = useState([]);

	// Pass this function to search 
	// so they can return course data
	const addCourse = (data) => {
		setCourseData(...courses, data)
	}

	return (
		<div className="App">
			<Search addCourse={addCourse}/>
			<Calendar courses={courses}/>
		</div> 
	);
}

export default App;
