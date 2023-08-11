// import React from 'react'
import styles from './Performer.module.css'
import { UserVideoComponent } from './video'
import ChattingBox from './ChattingBox'
import PerformerOption from './performeroption/PerformerOption'
import { chatOn } from '/src/assets/icons'

function Performer(props) {
  return (
    <>
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
                        <PerformerOption 
                        leaveSession={props.leaveSession}                            
                        subscribers={props.subscribers}/>
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
                     <img src={chatOn} alt="chatingOpenButton" />
                </div>
            </div>
        </div>
        <ChattingBox session={props.session} chats={props.chats} />
    </>
  )
}

export default Performer