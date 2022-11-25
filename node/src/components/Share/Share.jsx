import React, { createRef } from "react";
import { useScreenshot } from "use-react-screenshot";

import "./Share.css";

export default function Share({ courses }) {
	const ref = createRef(null);
	const [image, takeScreenshot] = useScreenshot();
	const share = () => takeScreenshot(ref.current);
	console.log(courses);
	/* 	const onSubmit = () => {
			console.log("hello");
			console.log(courses);
		}; */
	return (
		<div className="download-container">
			{/* <input className="download-button" type="submit" onSubmit={onSubmit} value="Download Course"/>  */}
			<div>
				<button className="download-button" onClick={share}>Download Course</button>
			</div>
			<img src={image} alt={"Screenshot"} />
			<div ref={ref}>
				<h1>use-react-screenshot</h1>
				<p>
					<strong>hook by @vre2h which allows to create screenshots</strong>
				</p>
			</div>
		</div>
	);
}
