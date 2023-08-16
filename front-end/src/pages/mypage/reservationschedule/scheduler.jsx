import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

function test(props) {

    const {events} = props
    const localizer = momentLocalizer(moment);
    const newEvents = events.map(item => ({
      title : item.title,
      allDay :false,
      start : new Date(item.startTime),
      end : new Date(item.endTime),
    }));

  return (
    <div
    style={{backgroudColor:"white"}}>
    <Calendar
      events = {newEvents}
      localizer={localizer}
    //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ color:'white', height: "30rem" }}
    />
  </div>
  )
}

export default test