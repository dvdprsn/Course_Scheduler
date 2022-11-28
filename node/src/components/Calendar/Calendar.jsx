import React, { createRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import { Popover } from "bootstrap";
import Save from "../Save/Save";
import Share from "../Share/Share";

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

export default function CalContainer({ courses, setCourseData, semType }) {
	// Monitor the state of our courses array
	//Build the calendar
	const ref = createRef(null);

	return (
		<div>
			<div
				className="calendar-container"
				data-testid="calendar"
				ref={ref}
			>
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
			<div className="shareBar">
				<Share imageRef={ref} />
				<Save
					courses={courses}
					setCourseData={setCourseData}
					semType={semType}
				/>
			</div>
		</div>
	);
}
