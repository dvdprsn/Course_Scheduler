import React from "react";
import "./Clear.css"

export default function ClearContainer({ clearCourses }) {
	const onSubmit = (e) => {
		e.preventDefault(); // Prevent reload
		clearCourses();
	};

	return (
		<div className="clear-container">
			<form className="add-form" onSubmit={onSubmit}>
				<input
					type="submit"
					value="Clear Calendar"
					className="btn btn-danger"
				/>
			</form>
		</div>
	);
}
