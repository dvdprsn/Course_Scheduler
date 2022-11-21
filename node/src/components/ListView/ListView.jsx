import React from "react";
import "./ListView.css";

export default function ListView({ courses, removeEvent }) {
	const courseNames = [];
	const getUniqueCourses = () => {
		var unique = [];
		courses.forEach((item) => {
			if (!courseNames.includes(item["title"].split(" ")[0])) {
				unique.push(item);
				courseNames.push(item["title"].split(" ")[0]);
			}
		});
		return unique;
	};

	const deleteCourse = (item) => {
		removeEvent(item["extendedProps"]["id"]);
	};

	return (
		<div className="listview-container">
			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Delete Course
				</button>
				<ul className="dropdown-menu">
					{getUniqueCourses().map((course, index) => (
						<li key={index}>
							<button
								className="dropdown-item"
								key={index}
								onClick={() => deleteCourse(course)}
							>
								{course["title"].split(" ")[0]}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
