import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import styles from './MyOption.module.css';
// import InputPImg from './inputimg/InputImg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TEST_URL, API_BASE_URL } from '../../constants';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function MyOption() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const userToken = useSelector((state) => state.user.token);

  const [selectTab, setSelectTab] = useState('BannerImg');

  const changeSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const [name, setName] = useState('');
  const [bannerPicture, setBannerPicture] = useState('string');
  const [profilePicture, setProfilePicture] = useState('string');
  const [phoneNumber, setPhoneNumber] = useState('string');
  const [nickname, setNickname] = useState('');
  const [selfDescription, setSelfDescription] = useState('');

  

  console.log(user)
  console.log(user.phoneNumber)
  function onSubmitHandler(){
    console.log(nickname)
    console.log(phoneNumber)
    console.log(selfDescription)
    const context = {
      name : name,
      bannerPicture: bannerPicture,
      profilePicture: profilePicture,
      nickname: nickname,
      phoneNumber: phoneNumber,
      selfDescription: selfDescription,
    };
    //유저정보 수정 요청
    axios.put(TEST_URL + `/user/update/info`,context, {
      headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + userToken
              },
            })
          .then(response => {
            // 유저 정보 수정 후 Redux에 user 값을 갱신
          console.log(response.data)
          const res2 = axios.get(`${API_BASE_URL}/user/mypage`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + userToken
            }
          });
          dispatch(setUser(res2.data));
          navigate('/myoption',{replace:true});
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
  }

  useEffect(() => {
    setName(user.name)
    // setBannerPicture('string')
    // setProfilePicture('string')
    // setPhoneNumber(user.phoneNumber)
    setNickname(user.nickname)
    setSelfDescription(user.selfDescription)
  }, []);

  // function onBannerImgeUrlChangeHandler(BannerimageUrl) {
  //   setBannerImgUrl(BannerimageUrl);
  // }

  // function onImgeUrlChangeHandler(imageUrl) {
  //   setImageUrl(imageUrl);
  // }

  function onNickNameChangeHandler(nickname){
    setNickname(nickname)
  }

  function onPhoneNumberChangeHandler(phoneNumber){
    setPhoneNumber(phoneNumber)
  }

  function onSelfDescription(selfDescription){
    setSelfDescription(selfDescription)

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
                  {/* <InputPImg className={styles.inputimg} /> */}
                </Form.Group>
              )}

              {(selectTab=='ProgileImg') && (
                <Form.Group className={styles.imgbox}>      
                  {/* <InputPImg className={styles.userimg} /> */}
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
                      placeholder={nickname}
                      // value={nickname}
                      onChange={(e) => onNickNameChangeHandler(e.target.value)}
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
                      placeholder={phoneNumber}
                      // value={phoneNumber}
                      onChange={(e) => onPhoneNumberChangeHandler(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}

              {(selectTab=='SelfDescription') && (
                <Form.Group className={styles.selfDescription}>
                  <div>
                    <Form.Control
                      type="text"
                      style={{height:"10rem",width:"20rem"}}
                      className={styles.input}
                      placeholder={selfDescription}
                      // value={selfDescription}
                      onChange={(e) => onSelfDescription(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}
            </Form>

        </Row>
        <Form.Group style={{ textAlign: "end" }}>
                <Button onClick={onSubmitHandler} type="submit" size="lg">
                  변경
                </Button>
        </Form.Group>
      </div>
    </div>
  );
}

export default MyOption;
