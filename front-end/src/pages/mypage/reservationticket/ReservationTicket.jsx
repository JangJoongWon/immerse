import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ReservationTicket.module.css';

function ReservationTicket({ data }) {
  return (
        <Row
            className={styles.box}>
          <Col sm={9} 
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.fields.poster_path})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
            }}
            className={styles.left}>
            <div
            >
            <Row >
              <Col
              className={`${styles.leftfont} ${styles.title}`}
              >
                {data.fields.title}
              </Col>
              <Col
                style={{textAlign:"end"}} 
                className={`${styles.leftfont} ${styles.logoname}`}>
                <h5>Immerse</h5>
              </Col>
            </Row>
            <Row >
              <Col 
                style={{alignItems:"end",marginTop:"10%"}} 
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
              </Col>
            </Row>
            </div>
          </Col>
          <Col sm={3} className={styles.right}>
            <div>
              <Row sm={3}>    
                <h2
                style={{color:"gold"}}
                >Free
                </h2>
              </Row>
              <Row>
                <div
                className={`${styles.rightfont} ${styles.date}`}
                >  
                  {data.fields.date.slice(6,10)}
                </div>
              </Row>
              <Row>
                <div
                className={`${styles.rightfont} ${styles.time}`}>
                  {data.fields.time}
                </div>
              </Row>
              <Row sm={3}>
                <div
                className={styles.bacodebox}>
                  <img 
                  className={styles.bacode}
                  src="../public/img/bacode.png" alt="bacode" />
                </div>
              </Row>
            </div>
          </Col>
        </Row>
  );
}

export default ReservationTicket;
