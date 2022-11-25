import React, { createRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import { useScreenshot, createFileName } from "use-react-screenshot";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Popover } from "bootstrap";

import "./Calendar.css";

//Builds the on hover tooltip
const addDescription = (info) => {
	//Basic error handling that will prevent crash
	if (!info.event.extendedProps.description) {
		console.log("Item must have description");
		return;
	}
	if (!info.event.extendedProps.name) {
		console.log("Item must have a name");
		return;
	}
	new Popover(info.el, {
		title: info.event.extendedProps.name,
		content: info.event.extendedProps.description,
		placement: "top",
		trigger: "hover",
		html: true, // So <br> creates new line
		container: "body",
	});
};

const headerOptions = {
	left: "",
	center: "",
	right: "",
};

const dayHeaderOptions = {
	weekday: "long",
};


export default function CalContainer({ courses }) {
	// Monitor the state of our courses array
	//Build the calendar
	const ref = createRef(null);
	const [image, takeScreenShot] = useScreenshot({
		type: "image/jpeg",
		quality: 1.0
	});
	console.log(image);
	const download = (image, { name = "img", extension = "jpg" } = {}) => {
		const a = document.createElement("a");
		a.href = image;
		a.download = createFileName(extension, name);
		a.click();
	};

	const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
	return (
		<div>
			<div className="calendar-container" data-testid="calendar" ref={ref}>
				<FullCalendar
					events={courses}
					plugins={[timeGridPlugin]}
					initialView="timeGridWeek"
					hiddenDays={[0, 6]}
					slotMinTime="07:00"
					slotMaxTime="23:00"
					eventDidMount={addDescription}
					headerToolbar={headerOptions}
					dayHeaderFormat={dayHeaderOptions}
					allDaySlot={false}
					height="auto"
				/>
			</div>
			<button onClick={downloadScreenshot} className="btn btn-primary">Download Calendar Screenshot</button>
		</div>
	);
}
