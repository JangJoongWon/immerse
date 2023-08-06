import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import styles from './MyOption.module.css';
import InputPImg from './inputimg/InputImg';
import { useSelector } from 'react-redux';
import axios from 'axios';

function MyOption() {

  const token = useSelector((state) => state.user.token);

  const [selectTab, setSelectTab] = useState('BannerImg');

  const changeSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const [bannerImgUrl, setBannerImgUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [currentCallNumber, setcurrentCallNumber] = useState('');
  const [currentNickname, setCurrentNickname] = useState('');
  const [selfDescription, setSelfDescription] = useState('');


  
  const context = {
    baneerImgUrl: bannerImgUrl,
    imageUrl: imageUrl,
    nickname: currentNickname,
    callNumber: currentCallNumber,
    selfDescription: selfDescription,
    Authorization: 'Bearer ' + token
  };

  useEffect(() => {
    try {
      const response = axios.post('https://localhost:8080/api/review', context);
      console.log(response);
    } catch (error) {
      console.log('create review failed:', error.response.data);
    }
  }, []);

  function onBannerImgeUrlChangeHandler(BannerimageUrl) {
    setBannerImgUrl(BannerimageUrl);
  }

  function onImgeUrlChangeHandler(imageUrl) {
    setImageUrl(imageUrl);
  }

  function NicknameChangeHandler() {
    // 현재 닉네임을 이용하여 닉네임 변경 처리
    console.log('Current Nickname:', currentNickname);
  }

  function CallNumberChangeHandler() {
    // 현재 전화번호를 이용하여 전화번호 변경 처리
    console.log('Current Call Number:', currentCallNumber);
  }

  function SelfDescriptionChangeHandler() {
    // 자기소개 변경 처리
    console.log('Self Description:', selfDescription);
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div>
          개인 정보 수정
        </div>
        <Row>
            <Button
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('BannerImg')}>
              배너 이미지
            </Button>

            <Button 
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('ProgileImg')}>
              프로필 이미지
            </Button>
   
            <Button 
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('NickName')}>
              닉네임
            </Button>
     
            <Button 
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('CallNumber')}>
              전화번호
            </Button>
     
            <Button 
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('SelfDescription')}>
              자기소개
            </Button>
        </Row>
        <Row>
            <Form>
              {(selectTab=='BannerImg') && (
                <Form.Group className={styles.imgbox}>
                  <InputPImg onChange={onBannerImgeUrlChangeHandler} className={styles.inputimg} />
                </Form.Group>
              )}

              {(selectTab=='ProgileImg') && (
                <Form.Group className={styles.imgbox}>      
                  <InputPImg onChange={onImgeUrlChangeHandler} className={styles.userimg} />
                </Form.Group>
              )}

              {/* {(selectTab=='Password') && (
                <Form.Group className={styles.password}>
                  <div>
                    <Form.Control
                      type="password"
                      className={styles.input}
                      placeholder=" 현재 비밀번호"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Control
                      type="password"
                      className={styles.input}
                      placeholder=" 변경 할 비밀번호"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Control
                      type="password"
                      className={styles.input}
                      placeholder=" 변경 할 비밀번호 확인"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )} */}

              {(selectTab=='NickName') && (
                <Form.Group className={styles.nickname}>
                  <div>
                    <Form.Control
                      type="string"
                      className={styles.input}
                      placeholder=" 현재 닉네임"
                      value={currentNickname}
                      onChange={(e) => setCurrentNickname(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}

              {(selectTab=='CallNumber') && (
                <Form.Group className={styles.callNumber}>
                  <div>
                    <Form.Control
                      type="string"
                      className={styles.input}
                      placeholder="현재 전화번호"
                      value={currentCallNumber}
                      onChange={(e) => setcurrentCallNumber(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}

              {(selectTab=='SelfDescription') && (
                <Form.Group className={styles.selfDescription}>
                  <div>
                    <Form.Control
                      as="textarea"
                      style={{height:"100%",width:"50%"}}
                      className={styles.input}
                      placeholder="자기소개"
                      value={selfDescription}
                      onChange={(e) => setSelfDescription(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}
            </Form>

        </Row>
        <Form.Group style={{ textAlign: "end" }}>
                <Button type="submit" size="lg">
                  변경
                </Button>
        </Form.Group>
      </div>
    </div>
  );
}

export default MyOption;
