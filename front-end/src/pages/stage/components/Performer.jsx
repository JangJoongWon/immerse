// import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Performer.module.css'
import { UserVideoComponent } from './video'
import ChattingBox from './ChattingBox'
import PerformerOption from './performeroption/PerformerOption'
import { chatOn, chatbutton } from '/src/assets/icons'
import { useSelector, useDispatch } from 'react-redux';
import { setEffectNum, setEffectMenu } from '../../../redux/userSlice'
import axios from 'axios'
import { API_BASE_URL } from '../../../constants'

function Performer(props) {

    const userToken = useSelector((state) => state.user.token);
    // const effectNum = useSelector((state) => state.user.effectNum);
    const effectMenu = useSelector((state) => state.user.effectMenu);
    const {effectList} = props
    const [chattingBoxOn, setChattingBoxOn] = useState(false)
    const handleChattingBox = () => {
      setChattingBoxOn(!chattingBoxOn)
    }
    const dispatch = useDispatch();

    const createEffect = async () => {
        try {
            console.log('token: ' + userToken);
            const response = await axios.get(API_BASE_URL + '/effect/', {
              headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': 'Bearer ' + userToken
              },
          });
            dispatch(setEffectMenu(response.data));
            console.log(response.data);
            return response.data; 
        }
        catch (e) {
            console.log(e);
            throw e;
        }
      }
      
      
      useEffect(()=>{
          createEffect()
      },[])

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
                                        mainStreamManager={props.mainStreamManager}
                                        effectMenu = {effectMenu}
                                        effectList={effectList}
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
                                    mainStreamManager={props.mainStreamManager}
                                    effectMenu = {effectMenu}
                                    effectList = {effectList}
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