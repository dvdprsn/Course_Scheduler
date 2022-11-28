import React from "react";
import "./Clear.css";

export default function ClearContainer({ clearCourses }) {
	const clearCal = () => {
		clearCourses();
	};

	return (
		<button id="clear-form" className="btn btn-danger" onClick={clearCal}>
			Clear Calendar
		</button>
	);
}
