// import { Container } from 'react-bootstrap';
import styles from './MyOption.module.css';
import {Col,Row} from 'react-bootstrap'

function MyOption() {
  return (
    <div 
    className={styles.background}>
      <div className={styles.container}>
      {/* Mypage Banner */}
      <div className={styles.banner}>
        <img className={styles.bannerimg} src="../public/icons/travel.jpg" alt="" />
      </div>
      {/* User Info Section */}
      <Row>
        <div className={styles.userinfo}>
          <Col sm={1}>
          </Col>
          <Col sm={3}>
            <div className={styles.userleft}>
              <div
                className='m-3'>
                <img className={styles.userimg} src="../public/icons/totoro2.jpg" alt="" />
              </div>
            </div>
          </Col>
          <Col sm={3}
            className={styles.usercenter}>
            <div>
              <Row sm={1}
                className={styles.outline}>
                <div
                  className={styles.username}
                >
                  유저아이디
                </div>
                <div
                  className={styles.email}
                >
                  이메일
                </div>
              </Row>
              <Row sm={1}
                className={styles.outline}>
                <div>
                  <div className="mypage-user-text">
                    <h1></h1>
                    <h3></h3>
                    <div className={styles.userbox}>
                      <p
                        className='m-2'
                      >집에 가고 싶어요. 집에 가고 싶어요.
                        집에 가고 싶어요 집에 가고 싶어요
                        집에 가고 싶어요
                        집에 가고 싶어요
                        집에 가고 싶어요
                        집에 가고 싶어요
                        집에 가고 싶어요
                        집에 가고 싶어요</p>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Col>
          <Col sm={2}>
          </Col>
          <Col sm={3}>
            <Row>
            </Row>
            <div className={styles.userright}>
            </div>
          </Col>

        </div>
      </Row>
      <Row >
      </Row>
    </div>
        <div
        className={styles.password}
        >
            <div>
            <input type="password" className={styles.input} placeholder=' 현재 비밀번호' />
            </div>
            <div>
            <input type="password" className={styles.input} placeholder=' 변경 할 비밀번호' />
            </div>
            <div>
            <input type="password" className={styles.input} placeholder=' 변경 할 비밀번호 확인' />
            </div>
        </div>

        <div
        className={styles.nickname}
        >
            <div>
            <input type="text" className={styles.input} placeholder=' 현재 닉네임' />
            </div>

        </div>
    </div>
  )
}

export default MyOption