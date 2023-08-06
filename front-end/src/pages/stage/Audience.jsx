// import React from 'react'
import styles from './Audience.module.css'
import { UserVideoComponent } from './video';
// import {useState} from 'react'
function Audience(props) {
    
//   console.log(props.subscribers[0])  
// const {publisher, subscribers, mainStreamManager} = props;

// subscribers[1].subscribeToVideo(false);
//   const {audioEnabled,setAudioEnabled} = useState(false);
//   const {videoEnabled,setVideoEnavled} = useState(false);

//   const AudioClickHandler = ()=>{
//     setAudioEnabled(!audioEnabled)
//     subscriber.subscribeToAudio(audioEnabled)
//   };

//   const VideoClickHandler = ()=>{
//     setVideoEnavled(!videoEnabled)
//   };



  
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
                                    streamManager={props.subscribers[index]} />
                            </div>
                          ) : null}
                      </div>
                  );
              })}
          </div>

          <div className={styles.sidebar}>

          </div>
        </div>
    </div>
  )
}

export default Audience


// const [videoEnabled, setVideoEnabled] = useState(true);
// const [audioEnabled, setAudioEnabled] = useState(true);

// const toggleVideo = () => {
//   if (publisher) {
//     publisher.publishVideo(!videoEnabled);
//     setVideoEnabled(!videoEnabled);
//   }
// };

// const toggleAudio = () => {
//   if (publisher) {
//     publisher.publishAudio(!audioEnabled);
//     setAudioEnabled(!audioEnabled);
//   }
// };

// <div className={styles.sidebar}>
// <div>
//   <button onClick={toggleVideo}>{videoEnabled ? 'Turn Video Off' : 'Turn Video On'}</button>
//   <button onClick={toggleAudio}>{audioEnabled ? 'Mute Audio' : 'Unmute Audio'}</button>
// </div>
// </div>