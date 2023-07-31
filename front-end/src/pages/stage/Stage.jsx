// import React from 'react'
import styles from './Stage.module.css'
import StageInfo from "../../components/cards/StageInfo"

function Stage() {
  return (
    <div className={styles.container}>
      <div>
        <StageInfo />
      </div>
    </div>
  )
}

export default Stage