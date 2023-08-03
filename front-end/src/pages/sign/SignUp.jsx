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

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickName] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');

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

    const isNickValid = (nick) => {
        const nickPattern = /^[a-zA-Z가-힣\s]{2,15}$/;
        return nickPattern.test(nick);
      };

    const isPhoneValid = (phone) => {
        const phonePattern = /^[0-9-]{10,13}$/;
        return phonePattern.test(phone);
      };

    // const isBirthValid = (birth) => {
    //   return !!birth;
    // };
    const isBirthValid = (birth) => {
      if (!birth) {
        return false; // 생일 값이 비어있는지 확인
      }
    
      const dateObject = new Date(birth);
      const isValidDate = !isNaN(dateObject.getTime()); // 유효한 날짜인지 확인
    
      if (!isValidDate) {
        return false; // 유효하지 않은 날짜이면 유효하지 않음
      }
    
      // Form.Control에서 설정한 min과 max 값 가져오기
      const minDate = new Date("1900-01-01");
      const maxDate = new Date("2023-07-31");
    
      // 입력된 날짜가 min과 max 사이에 있는지 확인
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
        // console.log(data)

        try {
          const response = await axios.post('https://i9d203.p.ssafy.io/api/user/signup', data);
          console.log(data)
          console.log('Signup success:', response.data);
          try {
            // 서버로 이메일과 비밀번호를 전송하여 토큰 받기
            const response = await axios.post('https://i9d203.p.ssafy.io/api/user/signin', data);
            console.log('Signin Info: ', response.config.data, 'Signin Token: ', response.data)
            const token = response.data; // 서버로부터 받은 토큰 값
            if (token) {
              dispatch(setToken(token)); // 토큰 값을 Redux 스토어에 저장하는 액션을 디스패치
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

      const isSubmitButtonActive =
      isEmailValid(email) &&
      isPasswordValid(password1) &&
      isPassword2Valid(password2) &&
      isNickValid(nickname) &&
      isNameValid(name) &&
      isGenderValid(gender) &&
      isPhoneValid(phone) &&
      isBirthValid(birth);


  return (
    <div className={styles.container}>
        <div className={styles.signupbox}>

            <div className={styles.boxcontent}>
                <div className={styles.title}>
                    <h1>SignUp</h1>
                </div>
                <div className={styles.signupformbox}>
                    <Form className={styles.signupform} 
                    onSubmit={onSubmitHandler}>
                        <div className={styles.body}>
                            <div className={styles.leftside}>
                                <Form.Group className={styles.inputform}>
                                  {/* {!isEmailValid(email) && <div className={styles.error}>올바른 형식이 아닙니다.</div>} */}
                                  <div
                                    className={styles.error}
                                    style={{ color: isEmailValid(email) ? 'blue' : 'red' }}
                                  >
                                    Email
                                  </div>
                                  <Form.Control
                                  className={styles.inputbox}
                                  type="email"
                                  placeholder="Enter Email"
                                  value={email}
                                  onChange={handleEmailChange}
                                  />
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                  <div
                                    className={styles.error}
                                    style={{ color: isPasswordValid(password1) ? 'blue' : 'red' }}
                                  >
                                    Password 
                                    <OverlayTrigger placement="top" overlay={passwordRule}>
                                      <span>
                                        <AiOutlineQuestionCircle bsStyle="default" style={{color: 'white'}}/>
                                      </span>                            
                                    </OverlayTrigger>
                                  </div>
                                  <Form.Control
                                  className={styles.inputbox}
                                  type="password"
                                  placeholder="Enter Password"
                                  value={password1}
                                  onChange={handlePasswordChange1}
                                  />
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                  <div
                                    className={styles.error}
                                    style={{ color: isPassword2Valid(password2) ? 'blue' : 'red' }}
                                  >
                                    Password
                                  </div>
                                  <Form.Control
                                  className={styles.inputbox}
                                  type="password"
                                  placeholder="Enter Password"
                                  value={password2}
                                  onChange={handlePasswordChange2}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  {/* {!isGenderValid(gender) && <div className={styles.error}>성별을 선택해 주세요.</div>} */}
                                  <div
                                    className={styles.error}
                                    style={{ color: isGenderValid(gender) ? 'blue' : 'red' }}
                                  >
                                    Gender
                                  </div>
                                  <Form.Select
                                  onChange={handleGenderChange}>
                                    <option>Select Gender</option>
                                    <option value="M">남</option>
                                    <option value="F">여</option>
                                  </Form.Select>
                                </Form.Group>
                            </div>
                            <div className={styles.rightside}>
                                <Form.Group className={styles.inputform}>
                                  {/* {!isNameValid(name) && <div className={styles.error}>올바른 형식이 아닙니다.</div>} */}
                                  <div
                                    className={styles.error}
                                    style={{ color: isNameValid(name) ? 'blue' : 'red' }}
                                  >
                                    Name
                                  </div>
                                  <Form.Control
                                  className={styles.inputbox}
                                  type="text"
                                  placeholder="Enter name"
                                  value={name}
                                  onChange={handleNameChange}
                                  />
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                  {/* {!isNickValid(nickname) && <div className={styles.error}>올바른 형식이 아닙니다.</div>} */}
                                  <div
                                    className={styles.error}
                                    style={{ color: isNickValid(nickname) ? 'blue' : 'red' }}
                                  >
                                    NickName
                                  </div>
                                  <Form.Control
                                  className={styles.inputbox}
                                  type="text"
                                  placeholder="Enter nick"
                                  value={nickname}
                                  onChange={handleNickNameChange}
                                  />
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                  {/* {!isPhoneValid(phone) && <div className={styles.error}>올바른 형식이 아닙니다.</div>} */}
                                  <div
                                    className={styles.error}
                                    style={{ color: isPhoneValid(phone) ? 'blue' : 'red' }}
                                  >
                                    PhoneNumber
                                    <OverlayTrigger placement="top" overlay={phoneNumberRule}>
                                      <span>
                                        <AiOutlineQuestionCircle bsStyle="default" style={{color: 'white'}}/>
                                      </span>                            
                                    </OverlayTrigger>
                                  </div>
                                  <Form.Control
                                  className={styles.inputbox}
                                  type="text"
                                  placeholder="Enter Phone Number"
                                  value={phone}
                                  onChange={handlePhoneChange}
                                  />
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                  {/* {!isBirthValid(birth) && <div className={styles.error}>올바른 형식이 아닙니다.</div>} */}
                                  <div
                                    className={styles.error}
                                    style={{ color: isBirthValid(birth) ? 'blue' : 'red' }}
                                  >
                                    Birth
                                  </div>
                                  <Form.Control
                                    className={styles.inputbox}
                                    type="date"
                                    value={birth}
                                    onChange={handleBirthChange}
                                    min="1900-01-01"
                                    max="2023-07-31"
                                  />
                                </Form.Group>
                            </div>
                        </div>
                        {isSubmitButtonActive ? (
                          <div className={styles.submitbutton}>
                            <Button type="submit">회원가입</Button>
                          </div>
                        ) : (
                          <div className={styles.submitbutton}>
                            <Button type="submit" disabled>회원가입</Button>
                          </div>
                        )}
                    </Form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SignUp