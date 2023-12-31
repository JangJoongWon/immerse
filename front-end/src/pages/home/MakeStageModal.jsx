import React, { useCallback, useEffect, useState } from 'react'
import styles from './MakeStageModal.module.css'
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { API_BASE_URL, TEST_URL } from '../../constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MakeStageModal({ show, onHide }) {

  const token = useSelector(state => state.user.token);
  const genres = useSelector(state => state.category.categories);
  const navigate = useNavigate()

  const [liveState, setLiveState] = useState(false)

  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState(genres[0].categoryId)
  const [rank, setRank] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [max, setMax] = useState(10)
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  // useEffect(() => {
  //   setGenre(genres[0].categoryId);
  // }, [genres]);

  const titleChange = (e) => {
    setTitle(e.target.value);
  }
  const genreChange = (e) => {
    setGenre(e.target.value);
  }
  const rankChange = (e) => {
    setRank(e.target.value);
  }
  const descriptionChange = (e) => {
    setDescription(e.target.value);
  }
  const priceChange = (e) => {
    setPrice(e.target.value);
  }
  const maxChange = (e) => {
    setMax(e.target.value);
  }
  // const dateChange = (e) => {
  //   setDate(e.target.value);
  // }
  const startChange = (e) => {
    setStart(e.target.value);
    const datetime = new Date(e.target.value);
    const extractedDate = datetime.toISOString().split('T')[0];
    setDate(extractedDate);
  }
  const endChange = (e) => {
    setEnd(e.target.value);
  }

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (isImageFile(selectedFile)) {
        setUploadedImage(selectedFile);
      } else {
        // 이미지 파일이 아닌 경우에 대한 처리
        alert('이미지 파일만 가능합니다.');
      }
    }
  };

  const isImageFile = (file) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return allowedExtensions.test(file.name);
  };

  const isEndTimeValid = () => {
    return end >= start;
  }

  const areAllFieldsFilled = () => {
    return date.trim()!=='' && start.trim() !== '' && end.trim() !== '';
  };


  const mustInput = () => {
    return title.trim() !== '' && parseFloat(price) >= 0 && areAllFieldsFilled() && isEndTimeValid();
  };


  const scheduleStage = async () => {

    const payload = new FormData();
    payload.append('file', uploadedImage);

    const headers = { 
      "Content-Type": "multipart/form-data", 
      'Authorization': 'Bearer ' + token
    };
    
    try {
      const res = await axios.post(`${TEST_URL}/file/upload`, payload, { headers });
      // console.log(res.data)
      console.log('success send!')

      const stageData = {
        'title' : title,
        'startTime': start,
        'endTime': end,
        'date': date,
        'thumbnail': res.data,
        'description': description,
        'price': price,
        'attendanceLimit': max,
        'categoryId': genre,
        'showTagDtoList': []
      };
      console.log('stageData:', stageData)

      try {
        const headers = { 
          "Content-Type": "application/json", 
          'Authorization': 'Bearer ' + token
        };
        const response = await axios.post(`${API_BASE_URL}/shows/`, stageData, { headers });
        console.log(response)
        navigate(`/stageinfo/${response.data}`)

      } catch(e) {
        console.log(e);
        throw e;
      }

      // onHide();
    }
    catch (e) {
      console.log(e);
      console.log('failed send!')
      throw e;
    } 
  }

  const reserveStage = async () => {
    try {
      const res = await scheduleStage();
      alert('공연이 예약되었습니다.')
      return res;
    }
    catch (e) {
      console.log(e);
    }
  }
  const startStageImmediately = async () => {
    try {
      const res = await scheduleStage();
      // redirection 필요
      return res;
    }
    catch (e) {
      console.log(e);
    }
  }

  const makeStage = async () => {
    if (liveState) return await startStageImmediately();
    else return await reserveStage();
  }

  return (
    <div className={styles.container}>
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onSubmit={makeStage}
        >
          <Container>
            <Modal.Header closeButton>
              <div className={styles.title}>
                  <Modal.Title id="contained-modal-title-vcenter">방만들기</Modal.Title>
                  {/* <Button variant={liveState ? "info" : "primary"} onClick={() => setLiveState(true)}>바로 공연</Button>
                  <Button variant={liveState ? "primary" : "info"} onClick={() => setLiveState(false)}>공연 예약</Button> */}
                <div className={styles.notification}>
                  <span style={{color:'red'}}>*</span><span>필수 입력값</span>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Row>
                  <Col sm="6">
                    <Form.Group>
                      <Form.Label><span style={{color:'red'}}>*</span>공연 제목</Form.Label>
                      <Form.Control type="email" placeholder="Enter title" value={title} onChange={titleChange}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 장르</Form.Label>
                      <Form.Select  value={genre} onChange={genreChange}>
                        {genres.map((genre) => (
                          <option value={genre.categoryId} key={genre.categoryId}>{genre.categoryName}</option>
                        ))}

                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>관람 등급</Form.Label>
                      <Form.Select value={rank} onChange={rankChange}>
                      <option>전체 이용가</option>
                      <option>15세 이상</option>
                      <option>19세 이상</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 설명</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Enter detail"  value={description} onChange={descriptionChange}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label><span style={{color:'red'}}>*</span>가격</Form.Label>
                      <Form.Control type="number"  min="0"  value={price} onChange={priceChange}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>최대 관객</Form.Label>
                      <Form.Control type="number"  min="1" max="10"  value={max} onChange={maxChange}/>
                    </Form.Group>
                  </Col>

                  <Col sm="6">

                    <Form.Group className="position-relative mb-3">
                      <Form.Label>공연 포스터</Form.Label>
                      <Form.Control type="file" onChange={handleImageUpload} />
                      {uploadedImage ? (
                        <div className={styles.imgbox}>
                          <div className={styles.imageWrapper}>
                            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" className={styles.imagefile} />
                          </div>
                        </div>
                      ):(
                        <div className={styles.imgbox}>
                          <div className={styles.imageWrapper}>
                          </div>
                        </div>
                      )}
                    </Form.Group>
              
                    {/* <Form.Group>
                      <Form.Label><span style={{color:'red'}}>*</span>공연 날짜</Form.Label>
                      <Form.Control type="date" placeholder="Enter date"  value={date} onChange={dateChange} />
                    </Form.Group> */}

                    <Form.Group>
                      <Form.Label><span style={{color:'red'}}>*</span>공연 시간(시작, 종료)</Form.Label>
                      <Form.Control type="datetime-local" placeholder="Enter start time"  value={start} onChange={startChange}/>
                      <Form.Control type="datetime-local" placeholder="Enter end time"  value={end} onChange={endChange}/>
                      {end && !isEndTimeValid() ? (
                        <p><span style={{color:'red'}}>※</span>시간 입력이 잘못되었습니다.</p>
                      ):(
                        <></>
                      )}
                    </Form.Group>

                  </Col>
                </Row>
                <button className={styles.makestageButton} type='button' onClick={makeStage} disabled={!mustInput()}>예약하기</button>
              </Form>
            </Modal.Body>
          </Container>
        </Modal>
      </div>
  )
}

export default MakeStageModal