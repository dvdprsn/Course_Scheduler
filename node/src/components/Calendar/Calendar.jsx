import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
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
	return (
		<div className="calendar-container" data-testid="calendar">
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
				allDayText="DE"
			/>
		</div>
	);
}
