// import React from 'react'
import styles from './Performer.module.css'
import { UserVideoComponent } from './video'

function Performer(props) {
  return (
    <div className={styles.container}>
        <div className={styles.totalbox}>
            <div className={styles.contentbox}>
                <div className={styles.leftside}>
                    <div className={styles.gridItem}>
                        {props.mainStreamManager !== undefined ? (
                            <div className={styles.streamcontainer}>
                                <UserVideoComponent
                                    streamManager={props.mainStreamManager} />
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={styles.rightside}>
                    {Array.from({ length: 11 }, (_, index) => (
                    <div key={index} className={styles.gridItem}>
                       {index < props.subscribers.length ? (
                            <div className={styles.streamcontainer}>
                                <UserVideoComponent 
                                streamManager={props.subscribers[index]} />
                            </div>
                        ) : null}
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