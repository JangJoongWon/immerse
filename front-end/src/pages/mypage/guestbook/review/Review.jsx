import React from 'react'
import {Row,Col} from 'react-bootstrap'
import styles from './Review.module.css'

function Review({data}) {
  return (
    <div 
    className="m-2">
        <Row>
            <Col sm={1}
            className={styles.img_container}>
                        <img 
                        className={styles.profile_img}
                        src="..\public\icons\totoro2.jpg" alt="profile_img" />
            </Col>
            <Col
            className={styles.content}>
                <div 
                >
                    <div
                    className={styles.box}
                    >
                        <th>{data.nickname}</th> {data.content}
                    </div>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Review