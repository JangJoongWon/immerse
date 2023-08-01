import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './SignIn.module.css'
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/userSlice'; // setToken 액션을 가져옴
import axios from 'axios';

function SignIn() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const data = {
    email : email,
    password : password
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // 서버로 이메일과 비밀번호를 전송하여 토큰 받기
      const response = await axios.post('http://i9d203.p.ssafy.io:8080/user/signin', data);
      // console.log(data)
      console.log('Signin Info: ', response.config.data, 'Signin Token: ', response.data)
      // console.log('Signin success:', response.data)

      const token = response.data; // 서버로부터 받은 토큰 값

      // 토큰이 유효한 경우, 로그인 상태를 처리
      if (token) {
        dispatch(setToken(token)); // 토큰 값을 Redux 스토어에 저장하는 액션을 디스패치
        console.log('Login success! Token:', token);
      } else {
        console.log('Login failed: Invalid token');
      }
    } catch (error) {
      console.log('Login failed:', error.response.data);
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.signinbox}>

          <div className={styles.boxcontent}>

            <div className={styles.title}>
              <h1>Login</h1>
            </div>
            <div className={styles.body}>
              <Form
                 className={styles.loginform} 
                 onSubmit={onSubmitHandler}>
                  <div className={styles.inputbox}>
                    <Form.Group className={styles.inputbox}>
                      <Form.Control
                        placeholder='Enter Email'
                        type="email"
                        value={email}
                        onChange={handleEmailChange}></Form.Control>
                    </Form.Group>
                  </div>
                  <div className={styles.inputbox}>
                    <Form.Group className={styles.inputbox}>
                      <Form.Control
                        placeholder='Enter Password'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}></Form.Control>
                    </Form.Group>
                  </div>
                <div className={styles.submitbutton}>
                  <Button type="submit">로그인</Button>
                </div>
              </Form>
            </div>

          </div>

        </div>
    </div>
  )
}

export default SignIn