// import React from 'react'
import { Button } from "react-bootstrap";
import styles from "./StageInfo.module.css"

function StageInfo(props) {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.loadingmessage}>
                <h1>{props.showData ? props.showData.nickname : null} 님의 공연으로 이동중입니다.</h1>
                <div className={styles.buttonbox}>
                    <div className={styles.loadingImg}>
                        <div className={styles.loadingSpinner}></div>
                    </div>
                    <div >
                        <div>
                            <Button className={styles.tobutton}
                            onClick={() => props.joinSession(false)}
                            >입장하기</Button>
                        </div>

                        <div>
                            <Button className={styles.tobutton}
                            onClick={() => props.joinSession(true)}
                            >시작하기</Button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default StageInfo

