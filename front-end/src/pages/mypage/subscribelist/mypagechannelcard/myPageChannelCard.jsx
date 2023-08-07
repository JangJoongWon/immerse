// import React from 'react'
import styles from "./myPageChannelCard.module.css"
import { Button, Col, Row } from "react-bootstrap";


const ChannelCard = (props) => {
  console.log(props)
  const {channel} = props
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Col>
          <Row className={styles.circle}>
            <div className="channel-card-img">
              <img className={styles.tumbnail} src="../../../public/icons/totoro2.jpg" alt="" />
            </div>
          </Row>
          <Row className={styles.info}>
            <div>
              <h5>{channel.nickname}</h5>
              <p>{channel.email}</p>
            </div>
          </Row>
          <Row className={styles.button}>
            <div>
              <Button variant="primary">구독</Button>
            </div>
          </Row>
        </Col>
      </div>
    </div>
  )
}

export default ChannelCard