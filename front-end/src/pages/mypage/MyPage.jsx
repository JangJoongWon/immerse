import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './MyPage.module.css';
import MypageTabbox from "./mypagetapbox/MyPageTabBox"
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TEST_URL, API_BASE_URL } from '../../constants';
import context from 'react-bootstrap/esm/AccordionContext';
import { settings } from '/src/assets/icons';

function MyPage() {
  const { nickname } = useParams();
  // console.log(nickname)
  const userToken = useSelector((state) => state.user.token);
  // const user = useSelector(state => state.user.user);

  const [user, setUser] = useState({});
  // const [scribe, setScribe] = useState(null);
  // const [userId, setUserId] = useState(1);

  useEffect(() => {
    // Axios를 사용하여 데이터를 불러옴
    axios.get(API_BASE_URL + `/user/mypage/${nickname}`)
      .then(response => {
        setUser(response.data); // 불러온 데이터를 상태(State)에 저장
        // console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const subscribe = () => {
    axios.post(API_BASE_URL + '/subscribe', {
      userId: user.userId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    },)
      .then(response => {
        setUser(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  return (
    <div className={styles.container}>
      {/* Mypage Banner */}
      <div className={styles.banner}>
        {user != null ? <img className={styles.bannerimg} src="user.bannerPicture" alt="bannerPicture" /> : <img className={styles.bannerimg} src="../public/icons/travel.jpg" alt="bannerPicture" />}
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
                {user != null ? <img className={styles.userimg} src="user.profilePicture" alt="profilePicture" /> : <img className={styles.userimg} src="../public/img/profileimg.png" alt="profilePicture" />}
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
                  {user == null ? <span>user nickname</span> : <span>{user.nickname}</span>}
                  <Link to="/MyOption">
                <img 
                src={settings} alt="setting" 
                style={{width:"5%"}}
                />
            
                  </Link>
                </div>
                <div
                  className={styles.email}
                >
                  {user == null ? <div>user email</div> : <div>{user.email}</div>}
                </div>
              </Row>
              <Row sm={1}
                className={styles.outline}>
                <div className={styles.userbox}>
                  <div className="mypage-user-text">
                    {user != null ? <div>{user.selfDescription}</div > : <div>자기 소개를 작성해주세요</div>}
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
                onClick={subscribe}
                className={styles.scribe}
              >구독</button>
            </div>
          </Col>

        </div>
      </Row>
      <Row >
        <MypageTabbox userId={user.userId}/>
      </Row>
    </div>
  );
}

export default MyPage;
