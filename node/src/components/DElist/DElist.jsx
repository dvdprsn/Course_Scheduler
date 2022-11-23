import React from "react";
import "./DElist.css";

export default function DElist({ courses }) {
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

	return (

		<div className="accordion accordion-flush">
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingOne">
					<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						<b>DE courses</b>
					</button>
				</h2>
				<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
					<div className="accordion-body">
						<ul className="list-group align-item-center">
							{getUniqueCourses().map((course, index) => (
								<li key={index} className="list-group-item list-group-item-action">
									<div className="d-flex w-100 justify-content-between">
										<h6 className="mb-1">{course["title"].split(" ")[0]}</h6>
									</div>

									<p className="mb-1">Some placeholder content in a paragraph.</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
