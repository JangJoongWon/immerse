// import React from 'react'
import styles from "./ChannelCard.module.css"
import { Button, Col, Row } from "react-bootstrap";

const ChannelCard = () => {
  return (
    <div className="channel-card-container">
      <div className={styles.card}>
        <Row>
          <Col xs={4} className={styles.circle}>
            <div className="channel-card-img">
              <img className={styles.tumbnail} src="../../../public/icons/totoro2.jpg" alt="" />
            </div>
          </Col>
          <Col xs={5} className={styles.info}>
            <div>
              <h5>ChannelName</h5>
              <p>email | subs</p>
              <p>About ChannelName About ChannelName About ChannelName</p>
            </div>
          </Col>
          <Col xs={3} className={styles.button}>
            <div>
              <Button variant="primary">구독</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ChannelCard