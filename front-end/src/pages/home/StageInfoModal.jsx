import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import styles from './StageInfoModal.module.css';
import { useNavigate } from 'react-router-dom';

function StageInfoModal({ show, onHide, data }) {

  const navigate = useNavigate();

  const attendStage = () => {
    navigate(`/stage/${data.showId}`);
  }

  return (
    <div>
      <Modal 
        show={show} 
        onHide={onHide} 
        size="lg" 
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton onClick={onHide}/>
        <Modal.Body>
          <Row>
            <Col xs={6}>
              <div className={styles.left}>
                <div className={styles.poster}>
                  <img
                    className={styles.posterimg}
                    src={data.thumbnail}
                    alt="Poster"
                  />
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className={styles.right}>
                <div className={styles.text}>
                  <h1>{data.title}</h1>
                  <p>{data.nickname}</p>
                  <p>{data.startTime}~{data.endTime}</p>
                  <p>{data.date}</p>
                  <p>{data.description}</p>
                  <p>{data.price}</p>
                  <p>{data.attendancLimit}</p>
                  <p>{data.maxAttendance}</p>
                  <p>{data.category_id}</p>

                  {data.showProgress == 'SCHEDULED'?(
                    <Button>예약하기</Button>
                  ):(
                    <Button onClick={attendStage}>입장하기</Button>
                  )}

                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StageInfoModal;
