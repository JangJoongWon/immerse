import React from 'react'
import {Col,Row} from 'react-bootstrap'
import styles from "./Announcment.module.css"

function Announcement(props) {
    console.log(props)
  var {data, nickname} = props  
  return (
    <div 
          className="m-2">
            <Row>
                <Col sm={2}>
                    <div 
                    className={styles.left}>
                            <img 
                            className={styles.profile_img}
                            src="..\public\icons\totoro2.jpg" alt="profile_img" />
                    </div>
                </Col>
                <Col>
                    <div 
                    className={styles.middle}>
                        <div
                        className={styles.nickname}>
                            {nickname}
                        </div>
                        <div
                        className={styles.content}>
                          <div>
                              {data.title}
                          </div>
                          <div>
                              {data.content}
                          </div>
                        </div>
                    </div>
                </Col>
            </Row>
          </div>
  )
}

export default Announcement