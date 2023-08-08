import {useState} from 'react'
import styles from './AudienceOption.module.css'
import { exit, videooffoption, videoonoption, effectoption, speackeroffoption, speackeronoption, micoffoption, miconoption} from '../../../../assets/icons/index'
function AudienceOption(props) {
  console.log('props:',props)
  console.log(props.leaveSession)
  const [videoEnable,setVideoEnable] = useState(true)
  const [audioEnable,setAudioEnable] = useState(true)
  const [micEnable,setMicEnable] = useState(true)
  
  const onChangeVideoHandler = () => {
    setVideoEnable(!videoEnable)
  }
  const onChangeAudioHandler = () => {
    setAudioEnable(!audioEnable)
  }
  const onChangeMicHandler = () => {
    setMicEnable(!micEnable)
  }

  

  return (

    <div
      className={styles.container}>
      <div
        className={styles.buttonbox}
      >
        { videoEnable
         ? 
         <div
         className={styles.imgbox}
         >
           <img
            style={{height:"70%",margin:"auto 1.5px"}}
            className={styles.img}
            onClick={onChangeVideoHandler}
            src={videoonoption} alt="videoonoption" />
         </div>
         :
         <div
         className={styles.imgbox}
         >
           <img 
           className={styles.img}
           onClick={onChangeVideoHandler}
           src={videooffoption} alt="videooffoption" />
         </div>
         }
        {
          audioEnable
          ?
          <div
          className={styles.imgbox}>
            <img
            className={styles.img}
            onClick={onChangeAudioHandler}
            src={speackeronoption} alt="speackeronoption" />
          </div>
          :
          <div
          className={styles.imgbox}>
            <img
            className={styles.img}
            onClick={onChangeAudioHandler}
            src={speackeroffoption} alt="speackeroffoption" />
          </div>
        }
        
        {
          micEnable
          ?
          <div
          className={styles.imgbox}>
            <img
            className={styles.img}
            style={{margin:'0 6px'}}
            onClick={onChangeMicHandler}
            src={miconoption} alt="miconoption" />
          </div>
          :
          <div
          className={styles.imgbox}>
            <img
            className={styles.img}
            onClick={onChangeMicHandler}
            src={micoffoption} alt="micoffoption" />
          </div>
        }
        
        <div
        className={styles.imgbox}>
          <img 
            className={styles.img}
          src={effectoption} alt="effectoption" />
        </div>

        <div
        className={styles.imgbox}>
          <img
          onClick={props.leaveSession} 
          className={styles.img}
          src={exit} alt="exit" />
        </div>
      </div>
    </div>
  )
}

export default AudienceOption