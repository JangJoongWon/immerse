import React from 'react'
import styles from './SignupPage.module.css'
import { Form, Button } from 'react-bootstrap'

function Signuppage() {
  
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
                    <Form>
                        <Form.Group className={styles.inputform}>
                            <h4>Email</h4>
                            <span>email 형식을 확인해 주세요</span>
                            <Form.Control
                                type="email" placeholder='Enter Email'>
                            </Form.Control>
                        </Form.Group>

                    </Form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Signuppage