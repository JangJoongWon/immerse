// import React from 'react'
import { Button, Row, Col } from "react-bootstrap";
import styles from "./StageInfo.module.css"

function StageInfo() {
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
                            <h1>info</h1>
                            <h1>info</h1>
                            <h1>info</h1>
                            <h1>info</h1>
                            <h1>info</h1>
                            <h1>info</h1>
                            <Button>입장하기</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default StageInfo

