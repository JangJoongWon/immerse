import React, { useCallback, useState } from 'react'
import styles from './MakeStageModal.module.css'
import { useDropzone } from 'react-dropzone';
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

function MakeStageModal({ show, onHide }) {

  const [liveState, setLiveState] = useState(true)

  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [rank, setRank] = useState('')
  const [expla, setExpla] = useState('')
  const [price, setPrice] = useState('')
  const [max, setMax] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const titleChange = (e) => {
    setTitle(e.target.value);
  }
  const genreChange = (e) => {
    setGenre(e.target.value);
  }
  const rankChange = (e) => {
    setRank(e.target.value);
  }
  const explaChange = (e) => {
    setExpla(e.target.value);
  }
  const priceChange = (e) => {
    setPrice(e.target.value);
  }
  const maxChange = (e) => {
    setMax(e.target.value);
  }
  const dateChange = (e) => {
    setDate(e.target.value);
  }
  const startChange = (e) => {
    setStart(e.target.value);
  }
  const endChange = (e) => {
    setEnd(e.target.value);
  }

  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0];
      setUploadedImage(imageFile);
      // setUploadedImage(URL.createObjectURL(imageFile));
    } else {
      console.log('Please upload only one image.');
    }
  }, []);

  const mustInput = () => {
    return title.trim() !== '' && parseFloat(price) >= 0;
  };

  const makeStage = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('rank', rank);
    formData.append('expla', expla);
    formData.append('price', price);
    formData.append('max', max);
    formData.append('date', date);
    formData.append('start', start);
    formData.append('end', end);
    formData.append('image', uploadedImage);

    try {
      const response = await axios.post('your-backend-url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      });

      if (response.status === 200) {
        console.log('Stage created successfully');
      }
    } catch (error) {
      console.error('Error creating stage:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    maxFiles: 1,
  });

  return (
    <div>
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
              <Modal.Title id="contained-modal-title-vcenter">방만들기</Modal.Title>
              <Button variant={liveState ? "info" : "primary"} onClick={() => setLiveState(true)}>바로 공연</Button>
              <Button variant={liveState ? "primary" : "info"} onClick={() => setLiveState(false)}>공연 예약</Button>
            </Modal.Header>

            <Modal.Body>
            <Form>
              <Row>
                <Col sm="6">
                  <Form.Group>
                    <Form.Label>공연 제목</Form.Label>
                    <Form.Control type="email" placeholder="Enter title" value={title} onChange={titleChange}/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>공연 장르</Form.Label>
                    <Form.Select  value={genre} onChange={genreChange}>
                      <option>버스킹</option>
                      <option>스탠딩 코미디</option>
                      <option>마술</option>
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
                    <Form.Control as="textarea" rows={5} placeholder="Enter detail"  value={expla} onChange={explaChange}/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>가격</Form.Label>
                    <Form.Control type="number"  min="0"  value={price} onChange={priceChange}/>
                  </Form.Group>
                </Col>

                <Col sm="6">

                <Form.Group className="position-relative mb-3">
                  <Form.Label>공연 포스터</Form.Label>
                  <div className={styles.picturebox}>
                    <div {...getRootProps()} className={`${styles.photobox} ${isDragActive ? styles.active : ''}`}>
                      <input {...getInputProps()} />
                      {uploadedImage ? (
                        <div className={styles.imgbox}>
                          {/* <h2>Uploaded Image:</h2> */}
                          <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" className={styles.imagefile} />
                        </div>
                      ) : (
                        <p>Drag drop an image or click here</p>
                      )}
                    </div>
                  </div>
                </Form.Group>

                  <Form.Group>
                    <Form.Label>최대 관객</Form.Label>
                    <Form.Control type="number"  min="1" max="10"  value={max} onChange={maxChange}/>
                  </Form.Group>

            
                  {liveState ? (
                    <></>
                    ) : (
                  <>
                    <Form.Group>
                      <Form.Label>공연 날짜</Form.Label>
                      <Form.Control type="email" placeholder="Enter date"  value={date} onChange={dateChange} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 시간</Form.Label>
                      <Form.Control type="datetime-local" placeholder="Enter start time"  value={start} onChange={startChange}/>
                      <Form.Control type="datetime-local" placeholder="Enter end time"  value={end} onChange={endChange}/>
                    </Form.Group>
                  </>
                  )}

                  </Col>
                </Row>
                <Button type='button' onClick={makeStage} disabled={!mustInput()}>submit</Button>
              </Form>
            </Modal.Body>
          {/* <div
          className={styles.bottom}>
          <Button variant="info" type="button" className="m-3">
            Live
          </Button>
          <Button variant="danger" type="button" className="m-3" onClick={onHide}>
            exit
          </Button>
          </div> */}
          </Container>
        </Modal>
      </div>
  )
}

export default MakeStageModal