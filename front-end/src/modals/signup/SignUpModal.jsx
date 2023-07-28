import { useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import "./SignUpModal.css"



const SignUpModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
      <Row>
          <Col sm="6" className="left_side_background">

            <Modal.Title 
            className="signup_left_side_title" 
            id="contained-modal-title-vcenter"
            style={{color:"white"}}
            >
            <h5>SignUP</h5>
            </Modal.Title>
            
            <Modal.Body >
              <Form>
                <Form.Group class="email_input">
                  <Form.Control
                  style={{background:"white"}}
                  color ="info" 
                  type="email white" placeholder="이메일"

                  />
                </Form.Group>
                <Form.Group class="email_input">
                  <Form.Control 
                  style={{background:"white"}}
                  type="text" placeholder="인증번호 확인" />
                </Form.Group>
                <Form.Group class="password_input">
                  <Form.Control 
                  style={{background:"white"}}
                  type="password" placeholder="비밀번호" />
                </Form.Group>
                <Form.Group class="password_input">
                  <Form.Control
                  style={{background:"white"}} 
                  type="password" placeholder="비밀번호 확인" />
                </Form.Group>

            </Form>
            </Modal.Body>
            <div
                className="login_move_button"
                >
                  <span>로그인으로 이동</span></div>
          </Col>
          <Col sm="6" className="right_side_background text-center">
            <Modal.Title
            className="signup_right_side_title" 
            style={{color:"white"}}
            >
              <h5>유저 정보 입력</h5>
            </Modal.Title>
            
            <Modal.Body >
              <Form>
                <Form.Group class="email_input placeholder-color">
                  <Form.Control
                  style={{background:"white"}}
                  type="text" placeholder="이름" />
                </Form.Group>
                <Form.Group class="password_input">
                  <Form.Control
                  style={{background:"white"}} 
                  type="text" placeholder="전화번호" />
                </Form.Group>
                <Form.Group class="password_input">
                  <Form.Control
                  style={{background:"white"}} 
                  type="text" placeholder="생년월일" />
                </Form.Group>
                <Form.Group
                className="text-center">
                  <Button 
                  variant="outline-light"
                  block type="button" 
                  className="login_button" 
                  >
                  회원가입
                  </Button>
                </Form.Group>
                <div 
                className="mt-3 mb-1 logo_button text-center mx-auto"
                style={{background:"white"}}
                >
                  <img className="my-2 GithubLogoImg" alt="Github_logo" src="img/Github_logo.png" />
                </div>
                <div
                className="logo_info" 
                >간편 회원가입</div>
            </Form>
            </Modal.Body>
          </Col>
        </Row>
  </Container>
</Modal>
  );
};

export default SignUpModal;