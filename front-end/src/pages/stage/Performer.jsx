import React from 'react'
import styles from './Performer.module.css'

function Performer() {
  return (
    <div className={styles.container}>
        <div className={styles.totalbox}>
            <div className={styles.contentbox}>
                <div className={styles.leftside}>

                </div>
                <div className={styles.rightside}>
                    {Array.from({ length: 9 }, (_, index) => (
                    <div key={index} className={styles.gridItem}>
                        {/* Your grid content */}
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