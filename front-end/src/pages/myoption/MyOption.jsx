import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import styles from './MyOption.module.css';
import InputPImg from './inputimg/InputImg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TEST_URL, API_BASE_URL } from '../../constants';

function MyOption() {
  const user = useSelector((state) => state.user.user);
  const userToken = useSelector((state) => state.user.token);

  const [selectTab, setSelectTab] = useState('BannerImg');

  const changeSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const [name, setName] = useState('');
  const [bannerPicture, setBannerPicture] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [selfDescription, setSelfDescription] = useState('');

  
  const context = {
    name : name,
    bannerPicture: bannerPicture,
    profilePicture: profilePicture,
    nickname: nickname,
    phoneNumber: phoneNumber,
    selfDescription: selfDescription,
  };
 
  function onSubmitHandler(){
    axios.post(TEST_URL + `/update/info`,context, {
      headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + userToken
              },
            })
          .then(response => {
          console.log(response.data)
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
  }

  useEffect(() => {
    setName(user.name)
    // setBannerPicture('string')
    // setProfilePicture('string')
    setPhoneNumber(user.phoneNumber)
    setNickname(user.nickname)
    setSelfDescription(user.selfDescription)
  }, []);

  function onBannerImgeUrlChangeHandler(BannerimageUrl) {
    setBannerImgUrl(BannerimageUrl);
  }

  function onImgeUrlChangeHandler(imageUrl) {
    setImageUrl(imageUrl);
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
            <Form
            onSubmit={onSubmitHandler}>
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
                      type="text"
                      className={styles.input}
                      placeholder=" 현재 닉네임"
                      // value={nickname}
                      // onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}

              {(selectTab=='CallNumber') && (
                <Form.Group className={styles.callNumber}>
                  <div>
                    <Form.Control
                      type="text"
                      className={styles.input}
                      placeholder="현재 전화번호"
                      // value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}

              {(selectTab=='SelfDescription') && (
                <Form.Group className={styles.selfDescription}>
                  <div>
                    <Form.Control
                      type="text"
                      style={{height:"100%",width:"50%"}}
                      className={styles.input}
                      placeholder="자기소개"
                      // value={selfDescription}
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
