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

function App() {
	// holds courses in the schedule
	const [courses, setCourseData] = useState([]);
	//Get course IDs with access with info.event.extendedProps.id

	// Pass this function to Search so course data is returnable
	const addCourse = (data) => {
		setCourseData((courses) => [...courses, data]); // This just appends the new data to the events array used in calendar
	};

	const clearCourses = () => {
		setCourseData([]);
	};

	return (
		//TODO Look at https://getbootstrap.com/docs/4.0/components/
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
