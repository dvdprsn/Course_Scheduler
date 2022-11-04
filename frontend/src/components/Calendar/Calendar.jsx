import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import { Tooltip } from "bootstrap"
import "./Calendar.css"

let zcourse = {
    title: "CIS*3760*0101 Lec",
    startTime: "09:00", // 24hrs
    endTime: "10:20", // 24hrs 
    daysOfWeek: [1, 3, 5], // mon = 1, wed = 3, fri = 5
    color: " #85929e", // Add bg color
    description: "Example <br> Course", // MUST HAVE A DESC CANNOT BE EMPTY
};

const addDescription = (info) => {
    new Tooltip(info.el, {
    title: info.event.extendedProps.description, // TODO ? Error handle, not sure how to do this
    placement: "top",
    trigger: "hover",
    html: true, // So <br> creates new line
    container: "body",
})}; 


export default function CalContainer() {
    
    // Monitor the state of our courses array
    const [courses, setCourseData] = useState([]);

    // call function to add a course
    const addCourse = () => {
        console.log(zcourse)
        setCourseData(zcourse);
    }

    return (
        <div className='calendar-container'>
            <FullCalendar
            events={[courses]}
            plugins={[ timeGridPlugin ]}
            initialView="timeGridWeek"
            hiddenDays={[0, 6]}
            allDaySlot={false}
            eventDidMount={addDescription}
          />
        </div>
    )
};