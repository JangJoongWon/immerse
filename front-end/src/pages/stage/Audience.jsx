// import React from 'react'
import styles from './Audience.module.css'
import { UserVideoComponent } from './video';

function Audience(props) {
  return (
    <div className={styles.container}>
        <div className={styles.totalbox}>
          
          <div className={styles.contentbox}>
              {Array.from({ length: 9 }, (_, index) => {
                  if (index === 1) {
                      return (
                          <div key={index} className={`${styles.bigGridItem} ${styles.bigGrid}`}>
                              {/* <h1>{[1].join(', ')}</h1> */}
                              {props.publisher !== undefined ? (
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
                          <h1>{index}</h1>
                          {/* Your grid content */}
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