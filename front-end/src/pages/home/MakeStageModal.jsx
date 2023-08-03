import React, { useCallback, useState } from 'react'
import styles from './MakeStageModal.module.css'
import { useDropzone } from 'react-dropzone';
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

function MakeStageModal({ show, onHide }) {

  const [liveState, setLiveState] = useState(true)


  const [uploadedImage, setUploadedImage] = useState(null);



  const onDrop = useCallback(acceptedFiles => {
    // Do something with the file
    if (acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0];
      setUploadedImage(URL.createObjectURL(imageFile));
    } else {
      console.log('Please upload only one image.');
    }
  }, []);

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
        >
          <Container>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">방만들기</Modal.Title>
              <Button variant={liveState ? "info" : "primary"} onClick={() => setLiveState(true)}>바로 공연</Button>
              <Button variant={liveState ? "primary" : "info"} onClick={() => setLiveState(false)}>공연 예약</Button>
            </Modal.Header>
            

            {liveState ? (
              <Modal.Body>
              <Form>
                <Row>
                  <Col sm="6">
                    <Form.Group>
                      <Form.Label>공연 제목</Form.Label>
                      <Form.Control type="email" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 장르</Form.Label>
                      <Form.Select>
                        <option>버스킹</option>
                        <option>스탠딩 코미디</option>
                        <option>마술</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>관람 등급</Form.Label>
                      <Form.Select>
                      <option>전체 이용가</option>
                      <option>15세 이상</option>
                      <option>19세 이상</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 설명</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Enter detail" />
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
                            <img src={uploadedImage} alt="Uploaded" className={styles.imagefile} />
                          </div>
                        ) : (
                          <p>Drag drop an image or click here</p>
                        )}
                      </div>
                    </div>
                  </Form.Group>

                    <Form.Group>
                      <Form.Label>최대 관객</Form.Label>
                      <Form.Control type="number"  min="1" max="10" />
                    </Form.Group>

                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            ) : (
              <Modal.Body>
              <Form>
                <Row>
                  <Col sm="6">
                    <Form.Group>
                      <Form.Label>공연 제목</Form.Label>
                      <Form.Control type="email" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 장르</Form.Label>
                      <Form.Select>
                        <option>버스킹</option>
                        <option>스탠딩 코미디</option>
                        <option>마술</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>관람 등급</Form.Label>
                      <Form.Select>
                      <option>전체 이용가</option>
                      <option>15세 이상</option>
                      <option>19세 이상</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 설명</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Enter detail" />
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
                          <img src={uploadedImage} alt="Uploaded" className={styles.imagefile} />
                        </div>
                      ) : (
                        <p>Drag drop an image or click here</p>
                      )}
                    </div>
                  </div>
                  {/* <Form.Control
                    type="file"
                    required
                    name="file"
                  /> */}
                  </Form.Group>

                    <Form.Group>
                      <Form.Label>최대 관객</Form.Label>
                      <Form.Control type="number"  min="1" max="10" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 날짜</Form.Label>
                      <Form.Control type="email" placeholder="Enter date" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>공연 시간</Form.Label>
                      <Form.Control type="email" placeholder="Enter time" />
                    </Form.Group>

                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            )}

          <div
          className={styles.bottom}>
          <Button variant="info" type="button" className="m-3">
            Live
          </Button>
          <Button variant="danger" type="button" className="m-3" onClick={onHide}>
            exit
          </Button>
          </div>
          </Container>
        </Modal>
      </div>
  )
}

export default MakeStageModal