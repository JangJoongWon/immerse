import React, {useState} from 'react'
import {Col,Row} from 'react-bootstrap'
import styles from "./Announcment.module.css"

function Announcement(props) {
  var {data, nickname} = props  
  const [visible,setVisible] = useState(false)

  const onClickVisible = ()=>{
    setVisible(true)
  }
  return (
    <div 
       
          className="m-2">
            <Row>
                <Col sm={1}>
                    <div 
                    className={styles.left}>
                            <img 
                            className={styles.profile_img}
                            src="../public/img/profileimg.png" alt="profile_img" />
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
                        className={styles.title}>
                          <div>
                              {data.title}
                          </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={1}>
                    <div 
                    className={styles.left}>
                    </div>
                </Col>
                <Col>
                    <div 
                    className={styles.middle}>
                      <div className={styles.content}>
                          <div
                          onClick={onClickVisible}
                          style={{marginBottom:"3%"}}>
                              {visible 
                              ?
                              <div>
                                {data.content}
                              </div>
                              :
                              <div>
                                <div>
                                  ...
                                </div>  
                                <div>
                                  자세히보기
                                </div>  
                              </div>
                              
                            }
                          </div>
                        </div>
                    </div>
                </Col>
            </Row>
          </div>
  )
}

export default Announcement