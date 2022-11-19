import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import Search from "../Search/Search";
import "./Interface.css";

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=lax`;
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

export default function Interface({ semType, isFall }) {
	// holds courses in the schedule
	let loadCourses = getCookie("courses");
	let result = [];
	try {
		result = JSON.parse(loadCourses);
	} catch (e) {
		console.log("Cookie data of courses not available");
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

	if (!isFall) { return null; }
	return (
		<div className="interface-container">
			<div className="course-buttons">
				<Search addCourse={addCourse} clearCourses={clearCourses} semType={semType} />
			</div>
			<Calendar courses={courses} />
		</div>	
	
	);
}