// import React from 'react'
import "./ChannelCard.css"
import { Button, Col, Row } from "react-bootstrap";

const ChannelCard = () => {
  return (
    <div className="channel-card-container">
      <div className="outside-card">
        <Row>
          <Col xs={5}>
            <div className="channel-card-img">
              <img className="channel-tumbnail" src="../../../public/icons/totoro2.jpg" alt="" />
            </div>
          </Col>
          <Col xs={5}>
            <div className="channel-card-info">
              <h5>ChannelName</h5>
              <p>email | subs</p>
              <p>About ChannelName About ChannelName About ChannelName</p>
            </div>
          </Col>
          <Col xs={2}>
            <div className="channel-sub-button">
              <Button variant="primary">구독</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ChannelCard