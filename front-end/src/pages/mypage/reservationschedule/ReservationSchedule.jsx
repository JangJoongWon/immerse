import {useState, useEffect} from 'react'; // React import를 추가하세요
import { Col, Row } from 'react-bootstrap'; // react-bootstrap의 Col, Row를 import합니다.
import axios from 'axios';
import styles from './ReservationSchedule.module.css';
import ReservationTicket from '../reservationticket/ReservationTicket';
import Scheduler from './scheduler'
import {API_BASE_URL, TEST_URL} from '../../../constants/index'
import { useSelector } from 'react-redux';
import { ticket, calendar,  ticketHover, calendarHover } from '/src/assets/icons';
import { useSpring, a } from 'react-spring';

function ReservationSchedule(props) {
  const {userId} = props
  const userToken = useSelector((state) => state.user.token);
  const [list, setList] = useState([]);
  const [calendarisHovered, setCalendarIsHovered] = useState(false);
  const [ticketisHovered, setTicketIsHovered] = useState(false);
  const [isSelectd, setIsSelceted] = useState('Calendar')

  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  useEffect(() => {
    // Axios를 사용하여 데이터를 불러옴
      axios.get(API_BASE_URL + `/reservation/user/${userId}`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + userToken
                },
            })
      .then(response => {
        setList(response.data); // 불러온 데이터를 상태(State)에 저장
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[]);

    const handleClick = (word) => {
      if (word != isSelectd){
      setIsSelceted(word)
      set(state => !state)
      }
    };
  return (
    <div>
      <div className={styles.buttonbox}>
        <div
        onClick={() => handleClick('Calendar')}
        className={styles.calendarbuttonbox}
        >
          <img
          onMouseOver={() => setCalendarIsHovered(true)}
          onMouseOut={() => setCalendarIsHovered(false)} 
          className={styles.calendarbutton}
          src={ (isSelectd==='Calendar'||calendarisHovered) ? calendarHover : calendar } alt="calendar" />
        </div>
        
        <div
        onClick={() => handleClick('Ticket')}
        className={styles.ticketbuttonbox
        }>
          <img
          onMouseOver={() => setTicketIsHovered(true)}
          onMouseOut={() => setTicketIsHovered(false)} 
          className={styles.ticketbutton} 
          src={ (isSelectd==='Ticket'||ticketisHovered) ? ticketHover : ticket} alt="ticket"/>
        </div>
      </div>
      <div className={styles.reservationSchedule}>
      {(isSelectd == 'Calendar')
      ?
      <a.div
        style={{ opacity: opacity.to(o => 1 - o), transform }} 
        className={styles.schedulerbox}>
        <Scheduler 
        event = {list}
        className={styles.scheduler}
        />
      </a.div>
      :
      <a.div
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
        className={styles.ticketbox} >
        <Row
        >
          {/* data.map 메소드를 사용하여 ReservationTicket 컴포넌트들을 그리드 형태로 배치 */}
          {list?.map((data) => (
            <Col 
              key={data.title}
              style={{margin: '1% 0% 5% 0%'}}
              sm={4} >
              <ReservationTicket data={data} />
            </Col>
          ))}
        </Row>
      </a.div>
    }
      </div>
    </div>  
  );
}

export default ReservationSchedule;