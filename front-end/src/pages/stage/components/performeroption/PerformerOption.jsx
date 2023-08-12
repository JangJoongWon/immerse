import {useState} from 'react'
import styles from './PerformerOption.module.css'
import { exit, videooffoption, videoonoption, effectoption, micoffoption, miconoption} from '../../../../assets/icons/index'
import { useSelector } from 'react-redux';

function AudienceOption(props) {
  // console.log('props:',props)
  const user = useSelector((state) => state.user.user);
  const [videoEnable,setVideoEnable] = useState(true)
  const [audioEnable,setAudioEnable] = useState(true)
  const [micEnable,setMicEnable] = useState(true)
  // const mysubscribe = props.subscribers
  const {subscribers} = props
  // console.log(subscribers)
  const mysubscriber = subscribers.filter(subscriber => JSON.parse(subscriber.stream.connection.data).clientData == user.nickname)
  // console.log(mysubscriber)

  console.log(mysubscriber[0].stream.getMediaStream())
  const onChangeVideoHandler = () => {

    const videoStream = mysubscriber[0].stream.getMediaStream().getVideoTracks()[0];
    videoStream.enabled = !videoStream.enabled;

    // mysubscriber[0].properties.publishVideo = !mysubscriber[0].properties.publishVideo
    setVideoEnable(!videoEnable)
  }
 
  const onChangeMicHandler = () => {
    const audioStream = mysubscriber[0].stream.getMediaStream().getAudioTracks()[0];
    audioStream.enabled = !audioStream.enabled;

    // mysubscriber[0].properties.publishAudio = !mysubscriber[0].properties.publishAudio
    setMicEnable(!micEnable)
  }
  

  return (

    <div
      className={styles.container}>
      <div
        className={styles.buttonbox}
      >
        { mysubscriber[0].stream.getMediaStream().getVideoTracks()[0].enabled
         ? 
         <div
         className={styles.imgbox}
         >
           <img
            // style={{height:"70%",margin:"auto 1.5px"}}
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
          mysubscriber[0].stream.getMediaStream().getAudioTracks()[0].enabled
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
          onClick={props.leaveSession} 
          className={styles.img}
          src={exit} alt="exit" />
        </div>
      </div>
    </div>
  )
}

export default AudienceOption