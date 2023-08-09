// import React from 'react'
import styles from './Audience.module.css'
import { UserVideoComponent } from './video';
// import { Row, Col} from 'react-bootstrap'
import {useState} from 'react'
import { chatOn, optionOn, optionOff, curtton } from '/src/assets/icons'
import AudienceOption from './audienceoption/AudienceOption'

function Audience(props) { 
  const [optionValue,setOptionValue] = useState(false)  

  const onClickChangeOption = ()=>{
    setOptionValue(!optionValue)
  }
  return (
    <div className={styles.container}>
        <div className={styles.totalbox}>
            <div className={styles.contentbox}>
                {Array.from({ length: 12 }, (_, index) => {
                    if (index === 1) {
                        return (
                            <div key={index} className={`${styles.bigGridItem} ${styles.bigGrid}`}>
                                {/* <h1>{[1].join(', ')}</h1> */}
                                {props.mainStreamManager !== undefined ? (
                                        <div 
                                        // className="stream-container col-md-6 col-xs-6" 
                                        className={styles.streamcontainer}
                                        // onClick={() => props.handleMainVideoStream(props.publisher)}
                                        >
                                        
                                            <UserVideoComponent
                                                streamManager={props.mainStreamManager} />
                                        </div>
                                    ) : 
                                    <div
                                    className={styles.w100h100}>
                                        <img 
                                        className={styles.w100h100}
                                        src={curtton} alt="comming soon" />

                                    </div>
                                        }
                            </div>
                            
                        );
                    }

                    return (
                        <div key={index} className={styles.gridItem}>
                            {/* <h1>{index}</h1> */}
                            {/* 1번 인덱스는 공연자를 위한 공간으로 남겨두었기 때문에
                                0번에서 2번으로 뛰어넘어야 함. 이 때 subscribers는 1번을 뛰어넘지 않음.
                                index가 0이라면 그대로 0을 참조,
                                index가 2 이상이라면 1을 뺀 값으로 참조하게 함.
                                (!!index = 0 if index == 0 else 1)
                            */}
                            {index - !!index < props.subscribers.length ? (
                                <div 
                                // className="stream-container col-md-6 col-xs-6" 
                                className={styles.streamcontainer}
                                // onClick={() => props.handleMainVideoStream(props.publisher)}
                                >
                                    <UserVideoComponent
                                        streamManager={props.subscribers[index - !!index]} />
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
            <div className={styles.sidebar}>
                <img src={chatOn} alt="chatingOpenButton" />
            </div>
        </div>
            <div
            className={styles.option}>
                { optionValue
                ?
                <div 
                className={styles.optionbar}>
                    <div>
                        <div>
                            <AudienceOption 
                            leaveSession={props.leaveSession}                            
                            subscribers={props.subscribers}/>
                        </div>
                        <div>
                            <img 
                            className={`${styles.noStyle} ${styles.closeOption}`}
                            onClick={onClickChangeOption}
                            src={optionOff} alt="OptionClose" />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <img 
                    className={`${styles.noStyle} ${styles.openOption}`}
                    onClick={onClickChangeOption}
                    src={optionOn} alt="OptionOpen" />
                </div>
                }
            </div>
    </div>
  )
}

export default Audience
