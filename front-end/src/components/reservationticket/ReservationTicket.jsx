import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ReservationTicket.module.css';

function ReservationTicket({ data }) {
  return (
        <Row
            className={styles.box}>
          <Col sm={9} className={styles.left}>
            <div
              style={{
                height: 0,
                paddingBottom: '50%', /* 2:1 비율로 설정 (높이를 너비의 절반으로) */
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.fields.poster_path})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
            <h4>
                {data.fields.title}   
            </h4>
            </div>
          </Col>
          <Col sm={3} className={styles.right}>
            <div>
              <h2>Free</h2>
            </div>
          </Col>
        </Row>
  );
}

export default ReservationTicket;
