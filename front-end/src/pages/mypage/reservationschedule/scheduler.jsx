import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

function test() {
    const localizer = momentLocalizer(moment);
    const event = [
      {title:"오늘도 출근",
      allDay:false,
      start: new Date(2023,8,8,11,0),
      end: new Date(2023,8,8,12,0),
    },
      {title:"내일도 출근",
      allDay:false,
      start: new Date(2023,8,8,17,0),
      end: new Date(2023,8,8,18,0),
    }
    ]
  return (
    <div
    style={{backgroudColor:"white"}}>
    <Calendar
      event = {event}
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