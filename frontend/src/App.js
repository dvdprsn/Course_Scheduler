import React, { useState, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import resourceTimeGridDay from "@fullcalendar/resource-timegrid";
import logo from "./lantern.svg";
import "./App.css";

document.addEventListener("DOMContentLoaded", function () {
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let dmy = year + "-" + month + "-" + date;

	let zcourse = {
		resourceId: "b",
		title: "CIS*3760*0101",
		start: dmy + "T09:00:00",
		end: dmy + "T16:00:00",
		allDay: false,
	};

	var calendarEl = document.getElementById("calendar");
	var calendar = new Calendar(calendarEl, {
		schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
		plugins: [resourceTimeGridDay],
		timeZone: "EST",
		initialView: "resourceTimeGridDay",
		resources: [
			{ id: "a", title: "Monday" },
			{ id: "b", title: "Tuesday" },
			{ id: "c", title: "Wendesday" },
			{ id: "d", title: "Thursday" },
			{ id: "e", title: "Friday" },
		],
		events: [
			{
				resourceId: "a",
				title: "ZOO*4300*0101",
				start: dmy + "T09:00:00",
				end: dmy + "T14:00:00",
				allDay: false,
			},
			{
				resourceId: "a",
				title: "HIST*2500*0101",
				start: dmy + "T10:00:00",
				end: dmy + "T14:00:00",
				allDay: false,
			},
		],
	});
	calendar.render();
	calendar.addEvent(zcourse); // IMPORTANT FOR DYNAMIC ADDING

	//TODO Make 5 text fields and a button
	//TODO fetch api data for each of those courses and create an event object - ERROR CHECKING (does course have lec time?)
	//TODO add all of those objects to the calendar
});

function App() {

	const [course = "N/A", setCourseData] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const getCourseInfo = () => {
		console.log("reached");
		fetch(
			"/api/course?name=" + document.getElementById("desiredCourse").value
		)
			.then((res) => res.json())
			.then((data) => {
				document.getElementById("showCourse").removeAttribute("hidden");
				setCourseData(JSON.stringify(data, null, 2));
			});
	};

	useEffect(() => {
		fetch("/api/time")
			.then((res) => res.json())
			.then((data) => {
				setCurrentTime(data.time);
			});
	}, []);

	return (
		<div className="App">
			<div id="calendar"></div>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<br></br>
				<p>Showing the integration with uwsgi serving Flask:</p>
				<p>The current time is {currentTime}</p>
			</header>
			<div className="Course-getter">
				<div>
					<br></br>
					<label>
						<b>Enter a course:</b>&nbsp;
					</label>
					<input id="desiredCourse"></input>
				</div>
				<br></br>
				<button id="getCourse" onClick={getCourseInfo}>
					Click Here for course info
				</button>
				<hr></hr>
				<div id="showCourse" hidden align="center">
					<label>
						<b>Raw Course Data:</b>
						<br></br>
					</label>
					<div className="JSON-display" display="block" align="left">
						<pre id="json">
							<p>{course}</p>
						</pre>
					</div>
				</div>
			</div>
			<br></br>
		</div>
	);
}

export default App;
