import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import styles from './StageInfoModal.module.css';
import datas from '../../stage_data.json';

function StageInfoModal({ show, onHide }) {
  const data = datas[1];

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
                    src={`https://image.tmdb.org/t/p/original/${data.fields.poster_path}`}
                    alt="Poster"
                  />
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className={styles.right}>
                <div className={styles.texts}>
                  <h1>{data.fields.title}</h1>
                  <h3>{data.fields.genre}</h3>
                  <h3>공연자</h3>
                  <p>{data.fields.description}</p>

                  <Button>입장하기</Button>

                  <Button>시작하기</Button>
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
