import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

function test(props) {

    const {events} = props
    const localizer = momentLocalizer(moment);
    const newEvents = events.map(item => ({
      title : item.title,
      allDay :false,
      start : new Date(item.startTime),
      end : new Date(item.endTime),
      showId : item.showId
    }));
    const navigate = useNavigate()
    const toStageInfo = (showId) => {
      navigate(`/stageinfo/${showId}`)
    }

    const handleEventClick = (event) => {
      // 클릭한 이벤트의 showId를 사용하여 페이지 이동
      toStageInfo(event.showId);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = isSelected ? '#9D72FF' : '#9D72FF'; // 선택되었을 때와 선택되지 않았을 때의 배경색
    const color = isSelected ? 'white' : 'white'; // 선택되었을 때와 선택되지 않았을 때의 글자색

    return {
        style: {
            backgroundColor,
            color,
        },
    };
};

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
      onSelectEvent={handleEventClick}
      eventPropGetter={eventStyleGetter}
    />
  </div>
  )
}

export default test