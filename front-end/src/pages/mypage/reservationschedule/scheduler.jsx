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
    // const events = [
    //   {title:"오늘도 출근",
    //   allDay:false,
    //   start: new Date(2023,7,8,11,0),
    //   end: new Date(2023,7,8,12,0),
    // },
    //   {title:"내일도 출근",
    //   allDay:false,
    //   start: new Date(2023,7,8,17,0),
    //   end: new Date(2023,7,8,18,0),
    // }
    // ]
  return (
    <div
    style={{backgroudColor:"white"}}>
    <Calendar
      events = {newEvents}
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