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
              // backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
            }}
            className={styles.left}>
            <div
            >
            <Row >
              {/* <Col
              className={`${styles.leftfont} ${styles.title}`}
              >
                {data.fields.title}
              </Col>
              <Col
                md={4}
                style={{textAlign:"center"}} 
                className={`${styles.leftfont} ${styles.logoname}`}>
                <h5>Immerse</h5>
              </Col> */}
            </Row>
            <Row >
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
            </Row>
            </div>
          </Col>
          <Col sm={3} 
              className={styles.right}>
            {/* <div>
              <Row
                style={{margin:"0 auto"}}
                sm={3}>    
                <h2
                style={{color:"gold"}}
                >Free
                </h2>
              </Row>
              <Row sm={3}>
                <div></div>
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
            </div> */}
          </Col>
        </Row>
  );
}

export default ReservationTicket;
