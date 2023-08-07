import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

function test() {
    const localizer = momentLocalizer(moment);
  return (
    <div
    style={{backgroudColor:"white"}}>
    <Calendar
      localizer={localizer}
    //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ backgroundColor: 'white', height: 500 }}
    />
  </div>
  )
}

export default test