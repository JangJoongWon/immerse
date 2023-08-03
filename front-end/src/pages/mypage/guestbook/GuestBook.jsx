import React, { useState, useRef } from 'react';
import styles from './GuestBook.module.css';
import guest from '../../../guest.json';
import { Col, Row, Form } from 'react-bootstrap';
import Review from './review/Review';
import axios from 'axios';

function GuestBook(props) {
  var user_id = props.user_id;

  const [content, setContent] = useState('');
  const handleContentChange = (input) => {
    setContent(input.target.value);
  };

  // 임시 데이터
  const guest_list = guest.data;


  // Ref 생성
  const inputRef = useRef(null);
  
  const context = {
    content: content,
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      inputRef.current.value = ''; // 입력창을 직접 참조하여 초기화
      await axios.put('https://192.168.0.6:8080/api/review', context);
    } catch (error) {
      console.log('create review failed:', error.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.up}>
        {guest_list.map((data) => (
          <div key={data.id} className={styles.messagebox}>
            {/* 각 공지사항을 나타내는 엘리먼트에 고유한 key 속성을 추가합니다. */}
            <Review data={data} />
          </div>
        ))}
      </div>
      <div className={styles.down}>
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col className={styles.input_bar}>
              <Form.Control
                ref={inputRef} // ref 연결
                placeholder='방명록에 글쓰기'
                type='string'
                value={content}
                onChange={handleContentChange}
              />
            </Col>
            <Col>
              <div className={styles.send_img} onClick={onSubmitHandler}>
                <img src='..\public\img\send.png' alt='send_img' />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default GuestBook;
