// import React from 'react'
import styles from './Audience.module.css'
import { UserVideoComponent } from './video';
// import { Row, Col} from 'react-bootstrap'
import {useState} from 'react'
import { chatOn, optionOn, optionOff } from '/src/assets/icons'

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
                                    ) : null}
                            </div>
                            
                        );
                    }

                    return (
                        <div key={index} className={styles.gridItem}>
                            {/* <h1>{index}</h1> */}
                            {/* Your grid content */}
                            {index < props.subscribers.length ? (
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
            <div
            className={styles.option}>
                { optionValue
                ?
                <div 
                className={styles.optionbar}>
                    <div
                    onClick={onClickChangeOption}
                    >
                    <div>
                        <img 
                        onClick={onClickChangeOption}
                        src={optionOff} alt="OptionCloseButton" />
                    </div>
                    </div>
                </div>
                :
                <img 
                onClick={onClickChangeOption}
                src={optionOn} alt="OptionOpenButton" />
                }
            </div>
        </div>
    </div>
  )
}

export default Audience
