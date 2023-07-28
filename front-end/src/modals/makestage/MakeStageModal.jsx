// import React from 'react'
import './MakeStageModal.css'
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";


function MakeStageModal({ show, onHide }) {
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
            </Modal.Header>

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
                <Form.Control
                  type="file"
                  required
                  name="file"
                />
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
          <div
          className='bottom'>
          <Button block variant="info" type="button" className="m-3">
            Live
          </Button>
          <Button block variant="danger" type="button" className="m-3" onClick={onHide}>
            exit
          </Button>
          </div>
          </Container>
        </Modal>
      </div>
  )
}

export default MakeStageModal