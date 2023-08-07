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
                        {/* Your grid content */}
                        <div>
                            {props.mainStreamManager !== undefined ? (
                                <div>
                                    <UserVideoComponent
                                        streamManager={props.mainStreamManager} />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className={styles.rightside}>
                    {Array.from({ length: 11 }, (_, index) => (
                    <div key={index} className={styles.gridItem}>
                       {index < props.subscribers.length ? (
                            <div 
                            // className="stream-container col-md-6 col-xs-6" 
                            className={styles.streamcontainer}
                            // onClick={() => props.handleMainVideoStream(props.publisher)}
                            >
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