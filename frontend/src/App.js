import React, { useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import Search from "./components/Search/Search";
import "./App.css";

/*Resources:
 *https://github.com/bradtraversy/react-crash-2021/tree/master/src
 *https://getbootstrap.com/docs/5.0/components/buttons/
 *https://www.youtube.com/watch?v=w7ejDZ8SWv8&ab_channel=TraversyMedia
 *https://ericgio.github.io/react-bootstrap-typeahead/
 */
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=lax`
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function App() {
	// holds courses in the schedule
	let loadCourses = getCookie("courses");
	let result = [];
	try {
		result = JSON.parse(loadCourses);
	} catch (e) {
		console.log(e);
	}
	const [courses, setCourseData] = useState(result);

	//Get course IDs with access with info.event.extendedProps.id
	// Pass this function to Search so course data is returnable

	const addCourse = (data) => {
		setCourseData((courses) => [...courses, data]); // This just appends the new data to the events array used in calendar
	};

	const clearCourses = () => {
		setCourseData([]);
	};

	let json_str = JSON.stringify(courses);
	setCookie("courses", json_str, 7);

	return (
		//Useful https://getbootstrap.com/docs/4.0/components/
		<div className="App">
			<h1 className="display-4">Course Scheduler</h1>
			<h1 className="text-muted">University of Guelph - Team 103</h1>
			<div className="course-buttons">
				<Search addCourse={addCourse} clearCourses={clearCourses} />
			</div>
			<Calendar courses={courses} />
		</div>
	);
}

export default App;
