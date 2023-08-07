import { useState } from 'react'
import { Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import styles from './SignUp.module.css'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/userSlice'; // setToken 액션을 가져옴
import { useNavigate } from 'react-router-dom';
import { AiOutlineQuestionCircle } from "react-icons/ai";

function SignUp() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [nickCheck, setNickCheck] = useState(false);
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');

  const passwordRule = (
    <Tooltip id="tooltip">
      <strong>비밀번호 규칙</strong> 숫자, 영문자, 특수문자('!@#$%') 포함
    </Tooltip>
  )
  const phoneNumberRule = (
    <Tooltip id="tooltip">
      <strong>전화번호 규칙</strong> 하이픈('-') 없이 숫자만 입력
    </Tooltip>
  )

  const isEmailValid = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  const isPasswordValid = (password) => {
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]+$/;
      return passwordPattern.test(password);
    };
  const isPassword2Valid = (password) => {
      return password === password1;
  };
  const isGenderValid = (selectedGender) => {
    return selectedGender === 'M' || selectedGender === 'F';
  };
  const isNameValid = (name) => {
    const englishPattern = /^[a-zA-Z]{2,15}$/;
    const koreanPattern = /^[가-힣]{2,15}$/;
    return (englishPattern.test(name) || koreanPattern.test(name));
  };
  const isPhoneValid = (phone) => {
    const phonePattern = /^[0-9-]{10,13}$/;
    return phonePattern.test(phone);
  };
  const isBirthValid = (birth) => {
    if (!birth) {
      return false; // 생일 값이 비어있는지 확인
    }
    const dateObject = new Date(birth);
    const isValidDate = !isNaN(dateObject.getTime());
    if (!isValidDate) {
      return false;
    }
    const minDate = new Date("1900-01-01");
    const maxDate = new Date("2023-07-31");
    return dateObject >= minDate && dateObject <= maxDate;
  };
  
  const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    const handlePasswordChange1 = (e) => {
      setPassword1(e.target.value);
    };
    const handlePasswordChange2 = (e) => {
      setPassword2(e.target.value);
    };
    const handleGenderChange = (e) => {
      setGender(e.target.value);
    };
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
    const handleNickNameChange = (e) => {
      setNickName(e.target.value);
      setNickCheck(false);
    };
    const handlePhoneChange = (e) => {
      setPhone(e.target.value);
    };
    const handleBirthChange = (e) => {
      setBirth(e.target.value);
    };

    const data = {"email": email,
                  "password": password1,
                  "name": name,
                  "gender": gender,
                  "nickname": nickname,
                  "phoneNumber": phone,
                  "birthday": birth}

    const onSubmitHandler = async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post('https://i9d203.p.ssafy.io/api/user/signup', data);
        console.log(data)
        console.log('Signup success:', response.data);
        try {
          // 서버로 이메일과 비밀번호를 전송하여 토큰 받기
          const response = await axios.post('https://i9d203.p.ssafy.io/api/user/signin', data);
          console.log('Signin Info: ', response.config.data, 'Signin Token: ', response.data)
          const token = response.data;
          if (token) {
            dispatch(setToken(token));
            console.log('Login success! Token:', token);
            navigate('/',{replace:true});
          } else {
            console.log('Login failed: Invalid token');
          }
        } catch (error) {
          console.log('Login failed:', error.response.data);
        }

      } catch (error) {
        console.log('Signup failed:', error.message);
      }
    };

    const datanick = {"nickname" : nickname}
    const nickNameCheck = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`http://i9d203.p.ssafy.io/api/user/check/${nickname}`, datanick);
        console.log('Check success:', response.data);
        setNickCheck(!response.data);
      } catch (error) {
        console.log('Check error', error);
        console.log(datanick);
      }
    };
    

    const isSubmitButtonActive =
    isEmailValid(email) &&
    isPasswordValid(password1) &&
    isPassword2Valid(password2) &&
    nickCheck &&
    isNameValid(name) &&
    isGenderValid(gender) &&
    isPhoneValid(phone) &&
    isBirthValid(birth);


  return (
    <div className={styles.container}>
      <div className={styles.signupbox}>        
          <div className={styles.boxcontent}>

              <div className={styles.title}>
                <div>
                  <h3>회원가입</h3>
                  <p>가입을 통해 더 다양한 서비스를 만나보세요</p>
                </div>
              </div>

              <div className={styles.signupformbox}>
                  <Form className={styles.signupform} 
                  onSubmit={onSubmitHandler}>
                      <div className={styles.body}>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isEmailValid(email) ? 'blue' : 'red' }}>
                            Email
                          </div> */}
                          <span>메일</span>
                          {isEmailValid(email) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>메일 형식을 확인해주세요</span>
                            </div>
                          )}
                          <div className={styles.mailCheck}>
                            <Form.Control
                            className={styles.inputbox}
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={handleEmailChange}
                            />
                            <Button>확인</Button>
                          </div>
                        </Form.Group>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isPasswordValid(password1) ? 'blue' : 'red' }}
                          >
                            Password 
                          </div> */}
                          <span>비밀번호</span>
                          {isPasswordValid(password1) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>비밀번호 형식을 확인해주세요</span>
                            </div>
                          )}
                          <OverlayTrigger placement="top" overlay={passwordRule}>
                            <span>
                              <AiOutlineQuestionCircle style={{ color: 'white' }} />
                            </span>
                          </OverlayTrigger>
                          <Form.Control
                          className={styles.inputbox}
                          type="password"
                          placeholder="Enter Password"
                          value={password1}
                          onChange={handlePasswordChange1}
                          />
                        </Form.Group>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isPassword2Valid(password2) ? 'blue' : 'red' }}
                          >
                            Password
                          </div> */}
                          <span>비밀번호 확인</span>
                          {isPassword2Valid(password2) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>비밀번호가 동일하지 않습니다</span>
                            </div>
                          )}
                          <Form.Control
                          className={styles.inputbox}
                          type="password"
                          placeholder="Enter Password"
                          value={password2}
                          onChange={handlePasswordChange2}
                          />
                        </Form.Group>
                        <Form.Group  className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isGenderValid(gender) ? 'blue' : 'red' }}
                          >
                            Gender
                          </div> */}
                          <span>성별</span>
                          {isGenderValid(gender) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>성별을 선택해주세요</span>
                            </div>
                          )}
                          <Form.Select
                          className={styles.inputbox}
                          onChange={handleGenderChange}>
                            <option>Select Gender</option>
                            <option value="M">남</option>
                            <option value="F">여</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isNameValid(name) ? 'blue' : 'red' }}
                          >
                            Name
                          </div> */}
                          <span>이름</span>
                          {isNameValid(name) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>이름을 입력해주세요</span>
                            </div>
                          )}
                          <Form.Control
                          className={styles.inputbox}
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={handleNameChange}
                          />
                        </Form.Group>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: nickCheck ? 'blue' : 'red' }}
                          >
                            NickName
                          </div> */}
                          <span>별병</span>
                          {nickCheck ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>별명이 사용 불가능합니다</span>
                            </div>
                          )}
                          <div
                          className={styles.nickCheck}
                          >
                            <Form.Control
                            className={styles.inputbox}
                            type="text"
                            placeholder="Enter nick"
                            value={nickname}
                            onChange={handleNickNameChange}
                            />
                            <Button onClick={nickNameCheck}>확인</Button>
                          </div>
                        </Form.Group>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isPhoneValid(phone) ? 'blue' : 'red' }}
                          >
                            PhoneNumber
                          </div> */}
                          <span>전화번호</span>
                          {isPhoneValid(phone) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>전화번호를 입력해주세요</span>
                            </div>
                          )}
                          <OverlayTrigger placement="top" overlay={phoneNumberRule}>
                            <span>
                              <AiOutlineQuestionCircle style={{color: 'white'}}/>
                            </span>                            
                          </OverlayTrigger>
                          <Form.Control
                          className={styles.inputbox}
                          type="text"
                          placeholder="Enter Phone Number"
                          value={phone}
                          onChange={handlePhoneChange}
                          />
                        </Form.Group>
                        <Form.Group className={styles.inputform}>
                          {/* <div
                            className={styles.error}
                            style={{ color: isBirthValid(birth) ? 'blue' : 'red' }}
                          >
                            Birth
                          </div> */}
                          <span>생년월일</span>
                          {isBirthValid(birth) ? (
                            <></>
                          ) : (
                            <div className={styles.error}>
                              <span style={{color:'red'}}>*</span>
                              <span>생년월일을 입력해주세요</span>
                            </div>
                          )}
                          <Form.Control
                            className={styles.inputbox}
                            type="date"
                            value={birth}
                            onChange={handleBirthChange}
                            min="1900-01-01"
                            max="2023-07-31"
                          />
                        </Form.Group>

                        {isSubmitButtonActive ? (
                          <div className={styles.submitbutton}>
                            <Button type="submit">회원가입</Button>
                          </div>
                        ) : (
                          <div className={styles.submitbutton}>
                            <Button type="submit" disabled>회원가입</Button>
                          </div>
                        )}

                      </div>
                  </Form>
              </div>
          </div>

      </div>
    </div>
  )
}

export default SignUp