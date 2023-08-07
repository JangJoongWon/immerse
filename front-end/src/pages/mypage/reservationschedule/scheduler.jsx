import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

function test() {
    const localizer = momentLocalizer(moment);
    const events = [
      {title:"오늘도 출근",
      allDay:false,
      start: new Date(2023,7,8,11,0),
      end: new Date(2023,7,8,12,0),
    },
      {title:"내일도 출근",
      allDay:false,
      start: new Date(2023,7,8,17,0),
      end: new Date(2023,7,8,18,0),
    }
    ]
  return (
    <div
    style={{backgroudColor:"white"}}>
    <Calendar
      events = {events}
      localizer={localizer}
    //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ backgroundColor: 'white', height: "30rem" }}
    />
  </div>
  )
}

export default test