// import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './MyPage.module.css';
import MypageTabbox from "./mypagetapbox/MyPageTabBox"

function MyPage() {

  return (
      <div className={styles.container}>
        {/* Mypage Banner */}
        <div className={styles.banner}>
          <img className={styles.bannerimg} src="../public/icons/travel.jpg" alt="" />
        </div>
        {/* User Info Section */}
        <Row>
          <div className={styles.userinfo}>
            <Col sm={1}>
            </Col>
            <Col sm={3}>
              <div className={styles.userleft}>
                <div 
                className='m-3'>
                  <img className={styles.userimg} src="../public/icons/totoro2.jpg" alt="" />
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
                    유저아이디
                  </div>
                  <div
                  className={styles.email}
                  >
                    이메일
                  </div>
                </Row>
                <Row sm={1}
                className={styles.outline}>
                  <div>
                    <div className="mypage-user-text">
                      <h1></h1>
                      <h3></h3>
                      <div className={styles.userbox}>
                        <p 
                        className='m-2'
                        >집에 가고 싶어요. 집에 가고 싶어요.
                          집에 가고 싶어요 집에 가고 싶어요
                          집에 가고 싶어요
                          집에 가고 싶어요
                          집에 가고 싶어요
                          집에 가고 싶어요
                          집에 가고 싶어요
                          집에 가고 싶어요</p>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </Col>
            <Col sm={2}>
            </Col>
            <Col sm={3}>
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
