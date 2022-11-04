import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CalContainer() {
    return (
        <FullCalendar
        plugins={[ timeGridPlugin ]}
        initialView="timeGridWeek"
        hiddenDays={[0, 6]}
      />
    )
};