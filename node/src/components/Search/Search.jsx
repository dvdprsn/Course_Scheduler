import React from "react";
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Clear from "../Clear/Clear";
import ListView from "../ListView/ListView";
import "react-bootstrap-typeahead/css/Typeahead.css"; // THIS IS A MUST
import "./Search.css";

var color = [
	"#25283D",
	"#F3722C",
	"#277DA1",
	"#43AA8B",
	"#90BE6D",
	"#CD8865",
	"#ECA809",
];
var colorindex = 0;
var courseID = 0;
var DEcounter = 1;
var cName = "";

//Stick the selection bar to the top on scroll
const stickNavbar = (navbar) =>  {
	var sticky = navbar.offsetTop;
	if (window.pageYOffset >= sticky) {
		console.log("Stick");
		navbar.classList.add("sticky");
	} else {
		console.log("Not stuck");
		navbar.classList.remove("sticky");
	}
};

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
const createDEEvent = (data) => {
	let newLec = {};

	var desc = `Distance Education Course <br> Prof: ${data.prof} <br> Sem: ${data.sem} <br> Campus: ${data.campus}`; // Other data from course JSON
	if (DEcounter >= 6) {
		DEcounter = 1;
	}
	cName = data.name.substring(data.name.indexOf(") ") + 1);

	newLec = {
		title: data.name.substring(0, data.name.indexOf(" ")),
		daysOfWeek: [DEcounter++],
		description: desc,
		extendedProps: {
			id: courseID,
			name: cName,
		},
		color: color[colorindex],
	};

	return newLec;
};
//Create Lecture EVENT
const createLecEventObj = (data) => {
	let newLec = {};

	var lecTimes = data.lecTime.split("-"); // Remove the split between start and end time
	lecTimes[0] = convertTime(lecTimes[0]); // Convert 12hrs to 24hrs for start time
	lecTimes[1] = convertTime(lecTimes[1]); // Convert 12hrs to 24hrs for end time
	var daysInts = createDaysArray(data.lecDays); // From the days that the lec is on
	var desc = `Prof: ${data.prof} <br> Room: ${data.lecRoom} <br> Sem: ${data.sem} <br> Campus: ${data.campus}`; // Other data from course JSON
	cName = data.name.substring(data.name.indexOf(") ") + 1);

	newLec = {
		title: data.name.substring(0, data.name.indexOf(" ")) + " - (LEC)",
		startTime: lecTimes[0],
		endTime: lecTimes[1],
		daysOfWeek: daysInts,
		description: desc,
		extendedProps: {
			id: courseID,
			name: cName,
		},
		color: color[colorindex],
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
	var desc = `Prof: ${data.prof} <br> Room: ${data.semRoom} <br> Sem: ${data.sem} <br> Campus: ${data.campus}`; // Other data from course JSON
	cName = data.name.substring(data.name.indexOf(") ") + 1);

	newLec = {
		title: data.name.substring(0, data.name.indexOf(" ")) + " - (LAB)",
		startTime: lecTimes[0],
		endTime: lecTimes[1],
		daysOfWeek: daysInts,
		description: desc, // Often the sem or lab title gets cut off so best to put it here
		extendedProps: {
			id: courseID,
			name: cName,
		},
		color: color[colorindex],
	};

	return newLec;
};

//Main search component
export default function Search({
	courses,
	addCourse,
	clearCourses,
	semType,
	removeEvent,
}) {
	const [selected, setSelected] = useState([]);
	const [options, setOptions] = useState([]);
	const [children, setChildren] = useState([]);

	//On submit button press
	const onSubmit = (e) => {
		e.preventDefault(); // Prevent reload
		getCourseInfo(); //API fetch and add to calendar
		setSelected([]); // Clear the selection options
	};

	// Get the list of courses
	if (options.length === 0) {
		fetch(`/api/coursesList?semester=${semType === "F22" ? "F22" : "W23"}`)
			.then((res) => res.json())
			.then((data) => {
				setOptions(data.codes);
				setChildren(data.info);
			});
	}

	// Get the navbar
	var navbar = document.getElementById("search-container");

	// Get the offset position of the navbar
	if(navbar != null) {	
		window.onscroll = stickNavbar(navbar);
	}

	const getCourseInfo = () => {
		//For each item in the selection fetch the event
		selected.forEach(function (item) {
			fetch(
				`/api/course?name=${item}&semester=${
					semType === "F22" ? "F22" : "W23"
				}`
			)
				.then((res) => res.json())
				.then((data) => {
					var courseAdded = 0;
					//Includes error handling for DE and no seminar and bad inputs
					if (data.name !== undefined && data.lecTime !== "NULL") {
						addCourse(createLecEventObj(data));
						courseAdded = 1;
					}
					if (data.name !== undefined && data.lecTime === "NULL") {
						addCourse(createDEEvent(data));
						courseAdded = 1;
					}
					if (data.name !== undefined && data.semTime !== "NULL") {
						addCourse(createSemEventObj(data));
						courseAdded = 1;
					}
					if (courseAdded === 1) {
						colorindex++;
					}
					if (colorindex === color.length) {
						colorindex = 0;
					}
					courseID++; // Once course is added, increment
					//Access with info.event.extendedProps.id
				});
		});
	};

	//resource for typeahead used - https://ericgio.github.io/react-bootstrap-typeahead/
	// This has some pretty nice documenation for it
	return (
		<div className="search-container" id="search-container">
			<form
				className="add-form"
				onSubmit={onSubmit}
				data-testid="search-bar"
			>
				<div className="outer-form-control">
					<Typeahead
						id="search-bar"
						onChange={setSelected}
						options={options}
						placeholder="Select a course..."
						selected={selected}
						minLength={3}
						multiple
						paginate={true}
						maxResults={10}
						renderMenuItemChildren={(option) => (
							<div>
								<strong>{children[options.indexOf(option)].name}</strong>
								<div>
									<small>{
										children[options.indexOf(option)].lecDays === "NULL" ? "" : children[options.indexOf(option)].lecDays + ":"} {
										children[options.indexOf(option)].lecTime === "NULL" ? "" : children[options.indexOf(option)].lecTime}
									</small>
								</div>
								<div>
									<small>{
										children[options.indexOf(option)].semDay === "NULL" ? "" : children[options.indexOf(option)].semDay + ":"} {
										children[options.indexOf(option)].semTime === "NULL" ? "" : children[options.indexOf(option)].semTime}
									</small>
								</div>
							</div>
						)}
					/>
				</div>
				<input
					type="submit"
					value="Load Courses"
					className="btn btn-success"
				/>
			</form>
			<ListView courses={courses} removeEvent={removeEvent} />
			<Clear clearCourses={clearCourses} />
		</div>
	);
}
