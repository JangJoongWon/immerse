// import React from 'react'
import styles from './MakeAnnouncementModal.module.css'
import { Modal, Button, Form, Container} from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import axios from 'axios';

function MakeStageModal({ show, onHide }) {

  const token = useSelector((state) => state.user.token);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const handleContentChange = (input) => {
    setContent(input.target.value);
  };
  const handleTitleChange = (input) => {
    setTitle(input.target.value);
  };

  
  // Ref 생성
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const context = {
    title: title,
    content: content,
    Authorization: 'Bearer ' + token
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      titleRef.current.value = ''; 
      contentRef.current.value = '';
      await axios.put('hhttps://i9d203.p.ssafy.io/api/review', context);
    } catch (error) {
      console.log('create review failed:', error.response.data);
    }
  };


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
              <Modal.Title id="contained-modal-title-vcenter">공지사항 만들기</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form
              onSubmit={onSubmitHandler}>
              <Form.Group>
                <Form.Label>공지사항 제목</Form.Label>
                <Form.Control 
                ref={titleRef} // ref 연결
                placeholder='공지할 내용'
                type='string'
                value={title}
                onChange={handleTitleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>공지사항 설명</Form.Label>
                <Form.Control 
                ref={contentRef} // ref 연결
                placeholder='공지할 내용'
                type='string'
                value={content}
                onChange={handleContentChange}
                as="textarea" 
                rows={5} 
                 />
              </Form.Group>
              
              <Form.Group
              className={styles.bottom} 
              >
                <Button
                  type='danger'>게시</Button>
              </Form.Group>
            </Form>
            </Modal.Body>
          </Container>
        </Modal>
      </div>
  )
}

export default MakeStageModal