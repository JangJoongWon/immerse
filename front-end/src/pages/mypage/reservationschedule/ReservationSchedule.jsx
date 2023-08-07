import {useState} from 'react'; // React import를 추가하세요
import { Col, Row } from 'react-bootstrap'; // react-bootstrap의 Col, Row를 import합니다.

import styles from './ReservationSchedule.module.css';
import data from '../../../stage_data.json';
import ReservationTicket from '../reservationticket/ReservationTicket';
import Scheduler from './scheduler'

function ReservationSchedule() {

  return (
    
    <div>
      <div>
       <Scheduler/>
      </div>
      <div className={styles.reservationSchedule}>
        <Row 
        className="justify-content-start"
        >
          {/* data.map 메소드를 사용하여 ReservationTicket 컴포넌트들을 그리드 형태로 배치 */}
          {data.map((data) => (
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
