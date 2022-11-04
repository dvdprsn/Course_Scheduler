import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import { Tooltip } from "bootstrap";
import "./Calendar.css";

//Builds the on hover tooltip
const addDescription = (info) => {
	new Tooltip(info.el, {
		title: info.event.extendedProps.description, // TODO ? Error handle, not sure how to do this
		placement: "top",
		trigger: "hover",
		html: true, // So <br> creates new line
		container: "body",
	});
};

export default function CalContainer({ courses }) {
	// Monitor the state of our courses array
    //Build the calendar
	return (
		<div className="calendar-container">
			<FullCalendar
				events={courses}
				plugins={[timeGridPlugin]}
				initialView="timeGridWeek"
				hiddenDays={[0, 6]}
				allDaySlot={false}
				slotMinTime="07:00"
				slotMaxTime="23:00"
				eventDidMount={addDescription}
			/>
		</div>
	);
}
