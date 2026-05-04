import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./Calendar.css";

function CalendarView() {
  const [events, setEvents] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:3001/api/reservas/1", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Error en API");
      return res.json();
    })
    .then(data => {

      const eventos = data.map(r => ({
        title: "Reserva",
        start: r.start || `${r.fecha}T${r.hora_inicio}`,
        end: r.end || `${r.fecha}T${r.hora_fin}`
      }));

      setEvents(eventos);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="calendar-container">

      <div className="calendar-header">
        <h2>📅 Booking Calendar</h2>
      </div>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        height="80vh"
      />
    </div>
  );
}

export default CalendarView;
