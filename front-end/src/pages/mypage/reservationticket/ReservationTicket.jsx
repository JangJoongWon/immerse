import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ReservationTicket.module.css';
import {bacode} from '/src/assets/icons'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function ReservationTicket({ data }) {

  const {
    thumbnail,
    title,
    showProgress,
    nickname,
    showId,
    startTime,
    endTime,
  } = data;

  const navigate = useNavigate()

  // 시작 시간과 종료 시간을 moment 객체로 변환
  const startMoment = moment(startTime);
  const endMoment = moment(endTime);

  // 월을 영어로 표현
  const monthName = startMoment.format('MMM');

  // 일자를 숫자로 표현
  const dayNumber = startMoment.format('D');

  // 시간을 별도로 표현 (24시간 형식)
  const startTimeString = startMoment.format('HH:mm');
  const endTimeString = endMoment.format('HH:mm');

  const toStageInfo = (e) => {
    e.preventDefault();
    navigate(`/stageinfo/${showId}`)
  }


  return (
        <Row
            className={styles.box}
            onClick={toStageInfo}>
          <Col 
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              // backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
            }}
            className={styles.left}>
            <div
            >
            <Row
             style={{marginTop:'3%'}}>
              <Col
                style={{textAlign:"end",paddingLeft:'0'}} 
                className={`${styles.leftfont} ${styles.logoname}`}>
                <h6>Immerse</h6>
              </Col>
            </Row>
            
            <Row>
              <Col
              className={`${styles.leftfont} ${styles.title}`}
              >
                <h1 
                style={{color:'white'}}>
                {title}
                </h1>
              </Col>
            </Row>
            
            <Row>
              {/* <Col 
                style={{alignItems:"end",marginTop:"15%"}} 
                >
                <div
                className={`${styles.leftfont} ${styles.date}`}
                >  
                  {data.fields.date.slice(6,10)}
                </div>
                <div
                className={`${styles.leftfont} ${styles.time}`}>
                  {data.fields.time}
                </div>
                <div
                  className={`${styles.leftfont} ${styles.time}`}>
                    {data.fields.genre}
                </div>
              </Col> */}

            <Row >
              <Col
              className={`${styles.leftfont} ${styles.nickname}`}
              >
                <h5>
                {nickname}
                </h5>
              </Col>
              <Col
              className={`${styles.leftfont} ${styles.leftdate}`}
              >
                <h6
                 style={{marginBottom:'3%'}}
                >
                {monthName},{dayNumber} 
                </h6>
              </Col>
            </Row>
            </Row>
            </div>
          </Col>
          <Col sm={3} 
              className={styles.right}>
            <div>
              <Row
                style={{margin:"0 auto"}}
                sm={3}>    
                {/* <h2
                style={{color:"gold"}}
                >Free
                </h2> */}
              </Row>
              <Row sm={3}>
                <div></div>
              </Row>
              <Row>
                <div
                className={`${styles.rightfont} ${styles.date}`}
                >  
                {monthName},{dayNumber}
                </div>
              </Row>
              <Row>
                <div
                className={`${styles.rightfont} ${styles.time}`}>
                  {startTimeString}
                </div>
              </Row>
              {/* <Row>
                <div
                className={`${styles.rightfont} ${styles.time}`}>
                  {endTimeString}
                </div>
              </Row> */}
              <Row>
                <div
                className={`${styles.rightfont} ${styles.bacode}`}>
                  <img src={bacode} alt="bacode" />
                </div>
              </Row>
            </div>
          </Col>
        </Row>
  );
}

export default ReservationTicket;
