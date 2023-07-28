// import { Container } from 'react-bootstrap';
import './MyOption.css';

function MyOption() {
  return (
    <div 
    className='background'>
        <h1 className='maintitle'>개인정보 수정</h1>
        <div
        className='passwordchang-background'
        >
            <div>
            <input type="password" className='input-bar' placeholder=' 현재 비밀번호' />
            </div>
            <div>
            <input type="password" className='input-bar' placeholder=' 변경 할 비밀번호' />
            </div>
            <div>
            <input type="password" className='input-bar' placeholder=' 변경 할 비밀번호 확인' />
            </div>
        </div>

        <div
        className='nicknamechange-background'
        >
            <div>
            <input type="text" className='input-bar' placeholder=' 현재 닉네임' />
            </div>

        </div>
    </div>
  )
}

export default MyOption