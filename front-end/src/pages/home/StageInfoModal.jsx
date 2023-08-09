import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import styles from './StageInfoModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';

function StageInfoModal({ show, onHide, data }) {

  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  // const categories = useSelector(state => state.category.categories)
  // const categoryMap = useSelector(state => state.category.categoryMap);

  const attendStage = () => {
    if(!token){
      alert('로그인 해주세요')
      navigate('/login')
      return;
    }
    navigate(`/stage/${data.showId}`);
  }

  const reserveStage = async () => {
    if(!token){
      alert('로그인 해주세요')
      navigate('/login')
      return;
    }
    const headers = { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    };

    const payload = {
      'showId' : data.showId,
      
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/reservations/${data.showId}`, { payload }, { headers });
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const startStage = async () => {
    try {
      console.log(token);
      const res = await axios.put(`${API_BASE_URL}/shows/${data.showId}/start`, {}, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + token
        }
      });
      console.log(res.data);
      navigate(`/stage/${data.showId}`);
    }
    catch (e) {
      console.log(e);
    }
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
                  <h1 style={{color:'black'}}>{data.title}</h1>
                  {/* <p>{categoryMap[data.category_id].categoryName}</p> */}
                  <p style={{fontWeight:'900'}}>공연자 : {data.nickname}</p>
                  {data.startTime && data.endTime ? (
                    <p>{data.startTime}~{data.endTime}</p>
                  ):(
                    <></>
                  )}
                  {data.date ? (
                    <p>{data.date}</p>
                  ):(
                    <></>
                  )}
                  <p>{data.description}</p>
                  <p>가격 : {data.price}</p>
                  <p>최대 인원 : {data.attendanceLimit}</p>

                  {data.showProgress === 'SCHEDULED' ? (
                    user && user.nickname ? (
                      data.nickname !== user.nickname ? (
                        <Button onClick={reserveStage}>예약하기</Button>
                      ) : (
                        <Button onClick={startStage}>시작하기</Button>
                      )
                    ) : (
                      <Button onClick={reserveStage}>예약하기</Button> // user 객체가 null인 경우 기본 동작
                    )
                  ) : (
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
