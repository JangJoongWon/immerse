import { Button } from 'react-bootstrap';
import './CheckPassword.css';


function MyOption() {
  return (
    <div 
    className='background'>
        <h5 className='maintitle'>계정 정보를 수정하기 위해서는 인증이 필요합니다.</h5>
        <h5 className='maintitle'>비밀번호 입력 후 확인 버튼을 클릭해주세요.</h5>
        <div>
            <input type="password" className='long-input-bar mid' placeholder=' 비밀번호' />
        </div>
        <div>
          <Button
            variant="outline-light"
            block type="button">
              확인
          </Button>
        </div>

    </div>
  )
}

export default MyOption