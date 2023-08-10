import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './SignIn.module.css'
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/userSlice'; // setToken 액션을 가져옴
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function SignIn() {

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    if(token) navigate('/');
  }
  )

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [emailError, setEmailError] = useState(true)
  const [passwordError, setPasswordError] = useState(true)

  const data = {
    email : email,
    password : password
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user/signin`, data);
      const token = response.data;
      if (token) {
        dispatch(setToken(token));
        const res2 = await axios.get(`${API_BASE_URL}/user/mypage`, {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
          }
        });
        dispatch(setUser(res2.data));
        alert('로그인 되었습니다.')
        navigate('/',{replace:true});
      } else {
        console.log('Login failed: Invalid token');
      }
    } catch (error) {
      if (error.response && error.response.data === 'INVALID_PASSWORD 잘못된 패스워드를 입력 했습니다.') {
        setPasswordError(false)
        setEmailError(true)

      } else if (error.response && error.response.data.indexOf('존재하지 않는 아이디입니다.', -1)) {
        setEmailError(false)
        setPasswordError(true)
      } else {
        console.log('Login failed:', error.response.data)
      }
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.signinbox}>

          <div className={styles.boxcontent}>

            <div className={styles.title}>
              <h3>Login</h3>
              <p>로그인해서 공연을 즐겨보세요</p>
            </div>
            <div className={styles.body}>
              <Form
                className={styles.loginform} 
                onSubmit={onSubmitHandler}>
                <div className={styles.inputbox}>
                  <Form.Group className={styles.inputgroup}>
                    <span>이메일</span>
                    <Form.Control
                      placeholder='Enter Email'
                      type="email"
                      value={email}
                      onChange={handleEmailChange}></Form.Control>
                  </Form.Group>
                </div>
                <div className={styles.inputbox}>
                  <Form.Group className={styles.inputgroup}>
                    <span>비밀번호</span>
                    <Form.Control
                      placeholder='Enter Password'
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}></Form.Control>
                  </Form.Group>
                </div>

                <div className={styles.tosignup}>
                  <span style={{color: 'white'}}>아이디가 없습니까?</span>
                  <a href="/signup">회원가입</a>
                </div>

                <div className={styles.errorMessage}>
                  {emailError ? (
                    <></>
                  ):(
                    <p style={{color:'red'}}>이메일를 확인해 주세요</p>
                  )}
                  {passwordError ? (
                    <></>
                  ):(
                    <p style={{color:'red'}}>비밀번호를 확인해 주세요</p>
                  )}
                </div>

                <div className={styles.submitbutton}>
                  <button type="submit" className={styles.loginButton}>로그인</button>
                </div>

              </Form>
            </div>

          </div>

          
        </div>
    </div>
  )
}

export default SignIn