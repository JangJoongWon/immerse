// import React from 'react'
import styles from './Performer.module.css'

function Performer() {
  return (
    <div className={styles.container}>
        <div className={styles.totalbox}>
            <div className={styles.contentbox}>
                <div className={styles.leftside}>
                <div className={styles.gridItem}>
                    {/* Your grid content */}
                </div>
                </div>
                <div className={styles.rightside}>
                    {Array.from({ length: 11 }, (_, index) => (
                    <div key={index} className={styles.gridItem}>
                        <h1>{index}</h1>
                    </div>
                    ))}
                </div>
            </div>
            <div className={styles.sidebar}>

            </div>
        </div>
    </div>
  )
}

export default Performer