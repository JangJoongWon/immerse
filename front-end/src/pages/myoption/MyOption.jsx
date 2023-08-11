import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import styles from './MyOption.module.css';
import InputPImg from './inputimg/InputImg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TEST_URL, API_BASE_URL } from '../../constants';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function MyOption() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userToken = useSelector((state) => state.user.token);
  console.log(user)
  const [selectTab, setSelectTab] = useState('BannerImg');

  const changeSelectTab = (tab) => {
    setSelectTab(tab);
  };
  const [passwordError, setPasswordError] = useState(true)
  const [name, setName] = useState('');
  const [bannerPicture, setBannerPicture] = useState('string');
  const [profilePicture, setProfilePicture] = useState('string');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [selfDescription, setSelfDescription] = useState('');

  function onSubmitHandler(){

    const context = {
      name : name,
      bannerPicture: bannerPicture,
      profilePicture: profilePicture,
      nickname: nickname,
      selfDescription: selfDescription,
    };

    axios.put(API_BASE_URL + `/user/update/info`,context, {
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
    // setPhoneNumber(user.phoneNumber)
    setNickname(user.nickname)
    setSelfDescription(user.selfDescription)
  }, []);

  const deleteAccount = async (token) => {
    // event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/withdrawal`, config);
      dispatch(logOut())
      console.log('Check success:', response);

    } catch (error) {
      console.log('Check error', error);
    }
  };


  const onDeletetHandler = async (event) => {
    event.preventDefault();
    
    const data = {
      email : user.email,
      password : password
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/signin`, data);
      const token = response.data;
      if (token) {
        deleteAccount(token)
        alert('회원 탈퇴가 되었습니다.')
        navigate('/',{replace:true})
      } else {
        console.log('Delete failed: Invalid token');
      }
    } catch (error) {
      if (error.response && error.response.data === 'INVALID_PASSWORD 잘못된 패스워드를 입력 했습니다.') {
        setPasswordError(false)}
      else {
        console.log('Delete failed:', error.response.data)
      }
    }
  }

  // function onBannerImgeUrlChangeHandler(BannerimageUrl) {
  //   setBannerImgUrl(BannerimageUrl);
  // }

  // function onImgeUrlChangeHandler(imageUrl) {
  //   setImageUrl(imageUrl);
  // }

  function onChangeNameHandler(name) {
    setName(name);
  }

  function onChangeNickNameHandler(nickname){
    setNickname(nickname)
  }

  function onChangeSelfDescription(selfDescription){
    setSelfDescription(selfDescription)
  }
  
  function onChangePassword(password){
    setPassword(password)
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div >
          <h1 
          className={styles.maintitle}
          >회원정보 수정</h1>
        </div>
        <div 
        className={styles.buttonbox}>
            <Button
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('BannerImg')}>
              배너 이미지
            </Button>

            <Button 
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('ProfileImg')}>
              프로필 이미지
            </Button>
   
            <Button 
            className={styles.button} 
            type="button" 
            size="lg" onClick={() => changeSelectTab('ProfileInfo')}>
              프로필 정보
            </Button>
     
            <Button 
            className={styles.button} 
            type="button" 
            variant="danger"
            size="lg" onClick={() => changeSelectTab('deleteAccount')}>
              회원탈퇴
            </Button>
        </div>
        <div 
        className={styles.formbox}>
            <Form
            onSubmit={onSubmitHandler}>
              {/* {(selectTab=='BannerImg') && (
                <Form.Group className={styles.imgbox}>
                  <InputPImg onChange={onBannerImgeUrlChangeHandler} className={styles.inputimg} />
                </Form.Group>
              )} */}
{/* 
              {(selectTab=='ProgileImg') && (
                <Form.Group className={styles.imgbox}>      
                  <InputPImg onChange={onImgeUrlChangeHandler} className={styles.userimg} />
                </Form.Group>
              )} */}

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

              {(selectTab=='ProfileInfo') && (
                <Form.Group>
                  <div 
                  className={styles.title}>
                    <h3>
                    프로필 정보
                    </h3>
                  </div>
                  <div>
                    <div
                    className={styles.inputbox}>
                      <Form.Label
                      className={styles.inputtitle}
                      >이름</Form.Label>
                      <Form.Control
                        type="text"
                        className={styles.input}
                        placeholder={name}
                        // value={phoneNumber}
                        onChange={(e) => onChangeNameHandler(e.target.value)}
                        />
                    </div>
                  </div>
                  <div>
                    <div
                    className={styles.inputbox}
                    >
                      <Form.Label
                      className={styles.inputtitle}
                      >닉네임</Form.Label>
                      <Form.Control
                        type="text"
                        className={styles.input}
                        placeholder={nickname}
                        // value={nickname}
                        onChange={(e) => onChangeNickNameHandler(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                    className={styles.inputbox}>
                      <Form.Label
                      className={styles.inputtitle}
                      >자기소개</Form.Label>
                      <Form.Control
                        type="text"
                        // style={{height:"100%",width:"50%"}}
                        className={styles.input}
                        placeholder={selfDescription}
                        // value={selfDescription}
                        onChange={(e) => onChangeSelfDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </Form.Group>
              )}

              {(selectTab=='deleteAccount') && (
                <Form.Group className={styles.selfDescription}>
                  <div 
                  className={styles.title}>
                    <h3>
                    회원 탈퇴
                    </h3>
                  </div>
                  <div>
                    <div
                    className={styles.inputbox}
                    >
                      <Form.Label
                        className={styles.inputtitle}
                        >비밀번호 확인</Form.Label>
                      <Form.Control
                        type="password"
                        className={styles.input}
                        placeholder={'회원 탈퇴를 위해 비밀번호를 입력해주세요'}
                        onChange={(e) => onChangePassword(e.target.value)}
                        />
                        {passwordError ? (
                          <></>
                        ):(
                          <p style={{color:'red'}}>비밀번호를 확인해 주세요</p>
                        )}
                    </div>
                  </div>
                </Form.Group>
              )}
            <Form.Group style={{ textAlign: "end" }}>

                 {(selectTab=='deleteAccount') 
                  ?
                  <Button variant='danger' onClick={onDeletetHandler}>
                    회원 탈퇴
                  </Button>
                  :  
                    <Button 
                    onClick={onSubmitHandler}
                    type="submit" size="lg">
                      변경
                    </Button>
                  }
            </Form.Group>
            </Form>
        </div>
                

      </div>
    </div>
  );
}

export default MyOption;
