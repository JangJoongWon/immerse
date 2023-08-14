// import React from 'react'
import { useState } from 'react'
import styles from './Performer.module.css'
import { UserVideoComponent } from './video'
import ChattingBox from './ChattingBox'
import PerformerOption from './performeroption/PerformerOption'
import { chatOn, chatbutton } from '/src/assets/icons'

function Performer(props) {
    const [chattingBoxOn, setChattingBoxOn] = useState(false)
    const handleChattingBox = () => {
      setChattingBoxOn(!chattingBoxOn)
    }

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
                        mainStreamManager={props.mainStreamManager}                            
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

                {chattingBoxOn ? (
                        <div className={styles.totalside}>
                                <div className={styles.sidebar}>
                                    <img src={chatbutton} onClick={handleChattingBox} alt="chatingOpenButton" />
                                </div>
                            <div className={styles.totalsidecontent}>
                                <div className={styles.chattingboxcontainer}>
                                    <ChattingBox session={props.session} chats={props.chats}/>
                                </div>
                            </div>
                        </div>
                     ) : (
                        <div className={styles.sidebar}>
                            <img src={chatbutton} onClick={handleChattingBox} alt="chatingOpenButton" />
                        </div>
                    )}
            </div>
        </div>
        
    </>
  )
}

export default Performer