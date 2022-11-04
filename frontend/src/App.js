import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar/Calendar";
import Search from "./components/Search/Search";
import "./App.css";

/*Resources:
 *https://github.com/bradtraversy/react-crash-2021/tree/master/src
 *https://getbootstrap.com/docs/4.0/components/
 *https://www.youtube.com/watch?v=w7ejDZ8SWv8&ab_channel=TraversyMedia
 */

function App() {
	// useState
	const [courses, setCourseData] = useState([]);
	// Pass this function to search
	// so they can return course data
	const addCourse = (data) => {
		setCourseData((courses) => [...courses, data]); // This just appends the new data to the events array used in calendar
	};

	//TODO Untested but should clear the events array when we make a button to use it
	const clearCourses = () => {
		setCourseData(courses);
	};

	return (
		//TODO Look at https://getbootstrap.com/docs/4.0/components/
		<div className="App">
			<Search addCourse={addCourse} />
			<Calendar courses={courses} />
		</div>
	);
}

export default App;
