import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './SignUp.module.css'
import axios from "axios"

function SignUp() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickName] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');

    const isEmailValid = (email) => {
        // 이메일 형식 검증을 위한 정규식 패턴
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };

    const isPasswordValid = (password) => {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]+$/;
        return passwordPattern.test(password);
      };
      
    const isPassword2Valid = (password) => {
        return password == password1;
    };

    const isGenderValid = (selectedGender) => {
      // 여기에 성별 유효성 검사 로직을 구현합니다.
      // 예시: 남성 또는 여성 중 하나를 선택해야 유효하다고 가정합니다.
      return selectedGender === '남' || selectedGender === '여';
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
        // 핸드폰 번호 유효성 검증을 위한 정규식 패턴
        const phonePattern = /^[0-9-]{10,13}$/;
        return phonePattern.test(phone);
      };
    const isBirthValid = (birth) => {
      // 여기에 날짜 유효성 검사 로직을 구현합니다.
      // 예시: 날짜가 선택되었는지 여부를 검사하고, 유효한 날짜인지 확인합니다.
      return !!birth;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlePasswordChange1 = (e) => {
        setPassword1(e.target.value);
      };
      const handlePasswordChange2 = (e) => {
        setPassword2(e.target.value);
      
        // // 비밀번호 일치 여부 확인
        // if (password1 !== e.target.value) {
        //   setPasswordError('비밀번호가 일치하지 않습니다.');
        // } else if (!password1 || !e.target.value) {
        //   setPasswordError('비밀번호를 입력해주세요.');
        // } else {
        //   setPasswordError(' ');
        // }
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

      const data = {email: email,
                    password: password1,
                    name: name,
                    gender: gender,
                    nickname: nickname,
                    phoneNumber: phone,
                    birthday: birth}

      const onSubmitHandler = async (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();
        console.log(data)

        try {
          // 서버로 회원가입 데이터 전송
          const response = await axios.post('http://i9d203.p.ssafy.io:8080/user/signup', data);
    
          // 서버로부터 응답 받은 데이터 처리
          console.log('Signup success:', response.data);
          // 만약 서버로부터 회원가입 성공 여부 등의 응답이 온다면 적절한 처리를 할 수 있습니다.
        } catch (error) {
          console.log('Signup failed:', error.message);
        }
      };

      const isSubmitButtonActive =
      isEmailValid &&
      isPasswordValid &&
      isPassword2Valid &&
      isNameValid &&
      isPhoneValid &&
      isBirthValid;


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
                                    <Form.Control
                                    className={styles.inputbox}
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    />
                                    {!isEmailValid(email) && <div className={styles.error}>올바른 이메일 형식이 아닙니다.</div>}
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                    <Form.Control
                                    className={styles.inputbox}
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password1}
                                    onChange={handlePasswordChange1}
                                    />
                                    {!isPasswordValid(password1) && <div className={styles.error}>올바른 비밀번호 형식이 아닙니다.</div>}
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                    <Form.Control
                                    className={styles.inputbox}
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password2}
                                    onChange={handlePasswordChange2}
                                    />
                                    {!isPassword2Valid(password2) && <div className={styles.error}>입력한 비밀번호가 다릅니다.</div>}
                                </Form.Group>
                                <Form.Group>
                                  <Form.Select
                                  onChange={handleGenderChange}>
                                    <option>Select Gender</option>
                                    <option value="남">남</option>
                                    <option value="여">여</option>
                                  </Form.Select>
                                  {!isGenderValid(gender) && <div className={styles.error}>성별을 선택해 주세요.</div>}
                                </Form.Group>
                            </div>
                            <div className={styles.rightside}>
                                <Form.Group className={styles.inputform}>
                                    <Form.Control
                                    className={styles.inputbox}
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={handleNameChange}
                                    />
                                    {!isNameValid(name) && <div className={styles.error}>올바른 이름 형식이 아닙니다.</div>}
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                    <Form.Control
                                    className={styles.inputbox}
                                    type="text"
                                    placeholder="Enter nick"
                                    value={nickname}
                                    onChange={handleNickNameChange}
                                    />
                                    {!isNickValid(nickname) && <div className={styles.error}>올바른 닉네임 형식이 아닙니다.</div>}
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                    <Form.Control
                                    className={styles.inputbox}
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    />
                                    {!isPhoneValid(phone) && <div className={styles.error}>올바른 전번 형식이 아닙니다.</div>}
                                </Form.Group>
                                <Form.Group className={styles.inputform}>
                                <Form.Control
                                  className={styles.inputbox}
                                  type="date"
                                  value={birth}
                                  onChange={handleBirthChange}
                                  min="1900-01-01"
                                  max="2023-07-31"
                                />
                                    {!isBirthValid(birth) && <div className={styles.error}>올바른 생일 형식이 아닙니다.</div>}
                                </Form.Group>
                            </div>
                        </div>
                        {!isSubmitButtonActive ? (
                          <div className={styles.submitbutton}>
                            <Button type="submit">회원가입</Button>
                          </div>
                        ) : (
                          // 조건을 충족하지 않을 때 버튼을 비활성화합니다.
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