import './CheckPassword.css';
import { Form, Button } from 'react-bootstrap'
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function MyOption() {

  const token = useSelector((state) => state.user.token);
  const [password, setPassword] = useState('');
  const handlePasswordChange = (input) => {
    setPassword(input.target.value);
  };
  const passwordRef = useRef(null)
  
  const navigate = useNavigate();
  const context = {
    password : password,
    Authorization: 'Bearer ' + token
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      passwordRef.current.value = '';
      navigate('/myoption'); 
      const response = await axios.get('https://192.168.0.6:8080/api/checkpassword', context);
      if (response.data==true){
        navigate('/myoption'); 
      }
    } catch (error) {
      console.log('create review failed:', error.response.data);
    }
  };

  return (
    <Form
    onSubmit={onSubmitHandler}
    className='background'>
      <Form.Group>
        
        <h5 className='maintitle'>계정 정보를 수정하기 위해서는 인증이 필요합니다.</h5>
        <h5 className='maintitle'>비밀번호 입력 후 확인 버튼을 클릭해주세요.</h5>
        <Form.Control
            type="password" 
            className='long-input-bar mid' 
            placeholder=' 비밀번호'
            ref={passwordRef} // ref 연결
            value={password}
            onChange={handlePasswordChange}>
        </Form.Control>
        <div>
          <Button
            variant="outline-light"
            type="submit">
            확인
          </Button>
        </div> 
      </Form.Group>
    </Form>
  )
}

export default MyOption