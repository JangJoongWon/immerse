// import React from 'react'
import { Button } from "react-bootstrap";
import styles from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.loadingmessage}>
                <h1>{props.showData ? props.showData.nickname : null} 님의 공연으로 이동중입니다.</h1>
                <div className={styles.buttonbox}>
                    <div className={styles.loadingImg}>
                        <div className={styles.loadingSpinner}></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Loading;

