import {useState, useEffect} from 'react'; // React import를 추가하세요
import { Col, Row } from 'react-bootstrap'; // react-bootstrap의 Col, Row를 import합니다.
import axios from 'axios';
import styles from './ReservationSchedule.module.css';
import data from '../../../stage_data.json';
import ReservationTicket from '../reservationticket/ReservationTicket';
import Scheduler from './scheduler'
import {API_BASE_URL, TEST_URL} from '../../../constants/index'
import { useSelector } from 'react-redux';

function ReservationSchedule(props) {
  const {userId} = props
  const userToken = useSelector((state) => state.user.token);
  const [list, setList] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 불러옴
      axios.get(TEST_URL + `/reservation/user/${userId}`, {
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

  return (
    
    <div>
      <div 
        className={styles.schedulerbox}>
       <Scheduler 
       className={styles.scheduler}
       />
      </div>
      <div className={styles.reservationSchedule}>
        <Row 
        className="justify-content-start"
        >
          {/* data.map 메소드를 사용하여 ReservationTicket 컴포넌트들을 그리드 형태로 배치 */}
          {list.map((data) => (
            <Col 
              key={data.id}
              style={{margin: '1% 0% 5% 0%'}}
              sm={4} >
              <ReservationTicket data={data} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ReservationSchedule;
