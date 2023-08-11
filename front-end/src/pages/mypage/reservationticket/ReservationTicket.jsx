import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ReservationTicket.module.css';
import {bacode} from '/src/assets/icons'

function ReservationTicket({ data }) {
  return (
        <Row
            className={styles.box}>
          <Col sm={9} 
            style={{
              // backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.fields.poster_path})`,
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
              className={`${styles.leftfont} ${styles.title}`}
              >
                {data.title}
              </Col>
              <Col
                md={4}
                style={{textAlign:"start",paddingLeft:'0'}} 
                className={`${styles.leftfont} ${styles.logoname}`}>
                <h5>Immerse</h5>
              </Col>
            </Row>
            
            <Row 
            style={{marginTop:'20%'}}>
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

              <Col>
                <h7>{data.nickname}</h7>
              </Col>
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
                </div>
              </Row>
              <Row>
                <div
                className={`${styles.rightfont} ${styles.time}`}>
                  <img src={bacode} alt="" />
                </div>
              </Row>
            </div>
          </Col>
        </Row>
  );
}

export default ReservationTicket;
