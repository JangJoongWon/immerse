import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import "./TermsOfUseModal.css"

const TermsOfUseModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container
      style={{background:"#31363B",borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",textAlign:"center",paddingTop:"1.5rem"}}>
        <div
        >
            <Modal.Title 
            className="main_title" 
            id="contained-modal-title-vcenter"
            style={{color:"white"}}
            >
            <h5>회원가입 약관</h5>
            </Modal.Title>
            
            <Modal.Body >
              <Form>
                <Row>

                <Form.Group
                style={{textAlign:"center",alignItems:"center"}}>
                  <Col
                  style={{border:"0.5rem white"}}>
                  <Form.Check
                  reverse
                  label = "전체동의"
                  color ="white" 
                  type="checkbox" 
                  style={{color:"white",fontSize:"1.5rem",margin:"1rem"}}
                  />
                  <hr
                  style={{color:"white",height:"0.5rem"}}
                  />
                  </Col>
                  <Col>
                  <Form.Check
                    reverse
                    label = "이용약관 동의 (필수)"
                    color ="white" 
                    type="checkbox" 
                    style={{color:"white",fontSize:"1.5rem",margin:"1rem"}}
                    />
                  </Col>

                  <Col>
                <Form.Check
                  reverse
                  label = "개인정보 처리방침 (필수)"
                  color ="white" 
                  type="checkbox" 
                  style={{color:"white",fontSize:"1.5rem",margin:"1rem"}}
                  />
                  </Col>
                  <Col>
                <Form.Check
                  reverse
                  label = "광고성 정보 수신 동의 (선택)"
                  color ="white" 
                  type="checkbox" 
                  style={{color:"white",fontSize:"1.5rem",margin:"1rem"}}
                  />
                  </Col>

                  <Button 
                  variant="outline-light"
                  block type="button" 
                  className="login_button" 
                  style={{margin:"2rem"}}
                  >
                  확인
                  </Button>
                </Form.Group>
              </Row>
            </Form>
            </Modal.Body>
        </div>
  </Container>
</Modal>
  );
};

export default TermsOfUseModal;