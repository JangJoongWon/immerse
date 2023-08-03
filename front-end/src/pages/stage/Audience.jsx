import React from 'react'
import styles from './Audience.module.css'

function Audience() {
  return (
    <div className={styles.container}>
        <div className={styles.totalbox}>
            <div className={styles.contentbox}>
                {Array.from({ length: 12 }, (_, index) => (
                <div key={index} className={styles.gridItem}>
                    {/* Your grid content */}
                </div>
                ))}
            </div>
            <div className={styles.sidebar}>

            </div>
        </div>
    </div>
  )
}

export default Audience