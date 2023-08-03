import styles from './GuestBook.module.css'
// import React from 'react';
import guest from '../../../guest.json';
import {Col, Row, Form} from 'react-bootstrap'
import Scroll from '../test/scroll'
import Review from './review/Review'

function GuestBook(props) {
    var user_id = props.user_id;
    const guest_list = guest.data;
    // console.log(user_id);
    // console.log(guest_list);

    return (
        <div
        className={styles.container}
        >
            <div
            className={styles.up}>
                {guest_list.map((data) => (
                <div 
                key={data.id}
                > {/* 각 공지사항을 나타내는 엘리먼트에 고유한 key 속성을 추가합니다. */}
                <Review data={data}/>
            </div>
            ))}
            </div>
            <div>
                <Row>
                    <Col
                     className={styles.input_bar}>
                        <Form.Control placeholder='방명록에 글쓰기'/>
                    </Col>
                    <Col>
                        <div
                        className={styles.send_img}>
                            <img src="..\public\img\send.png" alt="send_img" />
                        </div>   
                    </Col>
                </Row>
            </div>
            {/* <Scroll/> */}
        </div>
    );
}

export default GuestBook;
