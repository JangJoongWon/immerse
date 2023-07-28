import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import './SignInModal.css'

const SignInModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Row 
        style={{flex:"nowrap"}}>
          <Col sm="6" className="left_side_background">

            <Modal.Title 
            className="left_side_title" 
            id="contained-modal-title-vcenter"
            style={{color:"white"}}
            >LogIn
            </Modal.Title>
            
            <Modal.Body >
              <Form>
                <Form.Group class="email_input">
                  <Form.Control 
                  style={{background:"white"}}
                  type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group class="password_input">
                  <Form.Control 
                  style={{background:"white"}}
                  type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group
                className="text-center">
                  <Button 
                  variant="outline-light"
                  block type="button" 
                  className="login_button" 
                  >
                  로그인
                  </Button>
                </Form.Group>

                <div 
                className="mt-3 mb-1 logo_button text-center mx-auto"
                style={{background:"white"}}
                >
                  <img className="my-2" alt="Github_logo" src="img/Github_logo.png" />
                </div>
                <div
                className="logo_info" 
                >간편 회원가입</div>


            </Form>
            </Modal.Body>
          </Col>
          <Col sm="6" className="mx-auto right_side_background text-center">
            <Modal.Title closeButton
            className="right_side_title" 
            id="contained-modal-title-vcenter"
            style={{color:"white"}}
            >
              <h3>Hello, Friend!</h3>
            </Modal.Title>
            <Button
            variant="outline-light"
            block type="button"
            className="mx-auto sign_up_move_button" 
            >
            Sign Up
            </Button>
          </Col>
        </Row>
    </Container>
</Modal>
  );
};

export default SignInModal;