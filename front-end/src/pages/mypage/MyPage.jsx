// import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './MyPage.module.css';
import MypageTabbox from "./mypagetapbox/MyPageTabBox"
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TEST_URL, API_BASE_URL } from '../../constants';

function MyPage() {
  // const { nickname } = useParams();
  // const userToken = useSelector((state) => state.user.token);
  const user = useSelector(state => state.user.user);


  return (
    <div className={styles.container}>
      {/* Mypage Banner */}
      <div className={styles.banner}>
        {user.bannerPicture?<img className={styles.bannerimg} src="user.bannerPicture" alt="bannerPicture" /> :<img className={styles.bannerimg} src="../public/icons/travel.jpg" alt="bannerPicture" />}
      </div>
      {/* User Info Section */}
      <Row>
        <div className={styles.userinfo}>
          <Col sm={1}>
          </Col>
          <Col 
          className={styles.sm3}
          // sm={3}
          >
            <div className={styles.userleft}>
              <div
                className='m-3'>
                  {user.profilePicture? <img className={styles.userimg} src="user.profilePicture" alt="profilePicture" /> :<img className={styles.userimg} src="../public/img/profileimg.png" alt="profilePicture" />}
              </div>
            </div>
          </Col>
          <Col sm={3}
            className={styles.usercenter}>
            <div>
              <Row sm={1}
                className={styles.outline}>
                <div
                  className={styles.username}
                >
                  {user.nickname}
                  <Link to="/checkpassword">
                <img 
                src="../../../../public/icons/Setting.png" alt="setting" 
                style={{width:"5%"}}
                />
            
                  </Link>
                </div>
                <div
                  className={styles.email}
                >
                  {user.email}
                </div>
              </Row>
              <Row sm={1}
                className={styles.outline}>
                <div className={styles.userbox}>
                  <div className="mypage-user-text">
                      {user.selfDescription ?<div>{user.selfDescription}</div > :<div>자기 소개를 작성해주세요</div>}
                  </div>
                </div>
              </Row>
            </div>
          </Col>
          <Col sm={2}>
          </Col>
          <Col sm={3}>
            <Row>
            </Row>
            <div className={styles.userright}>
              <button
                className={styles.scribe}
              >구독</button>
            </div>
          </Col>

        </div>
      </Row>
      <Row >
        <MypageTabbox />
      </Row>
    </div>
  );
}

export default MyPage;
