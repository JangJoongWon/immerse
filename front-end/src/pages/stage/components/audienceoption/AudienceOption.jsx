import {useState} from 'react'
import styles from './AudienceOption.module.css'
import { videooffoption, videoonoption, effectoption, speackeroffoption, speackeronoption, micoffoption, miconoption} from '../../../../assets/icons/index'
function AudienceOption(props) {
  console.log('props:',props)
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
         <img
          className={styles.img}
          onClick={onChangeVideoHandler}
          src={videoonoption} alt="videoonoption" />
         :
         <img 
         className={styles.img}
         onClick={onChangeVideoHandler}
         src={videooffoption} alt="videooffoption" />
         }
        {
          audioEnable
          ?
          <img
          className={styles.img}
          onClick={onChangeAudioHandler}
          src={speackeronoption} alt="speackeronoption" />
          :
          <img
          className={styles.img}
          onClick={onChangeAudioHandler}
          src={speackeroffoption} alt="speackeroffoption" />
        }
        
        {
          micEnable
          ?
          <img
          className={styles.img}
          onClick={onChangeMicHandler}
          src={miconoption} alt="miconoption" />
          :
          <img
          className={styles.img}
          onClick={onChangeMicHandler}
          src={micoffoption} alt="micoffoption" />
        }
        
        <img 
          className={styles.img}
        src={effectoption} alt="effectoption" />
      </div>
    </div>
  )
}

export default AudienceOption