// import React from 'react'
import { Button, Row, Col } from "react-bootstrap";
import styles from "./StageInfo.module.css"

function StageInfo(props) {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <Row>
                <Col xs={6}>
                    <div className={styles.left}>
                        <div className={styles.poster}>
                            <img className={styles.posterimg} src="../../../public/icons/totoro2.jpg" alt="" />
                        </div>
                    </div>
                </Col>
                <Col xs={6}>
                    <div className={styles.right}>
                        <div className={styles.texts}>    
                            <h1>{props.id} 의 공연</h1>
                            <p>info</p>
                            <Button
                            onClick={() => props.joinSession(false)}
                            >입장하기</Button>

                            <Button
                            onClick={() => props.joinSession(true)}
                            >시작하기</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default StageInfo

