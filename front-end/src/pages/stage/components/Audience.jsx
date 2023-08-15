// import React from 'react'
import styles from './Audience.module.css'
import { UserVideoComponent } from './video';
// import { Row, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import { chatOn, optionOn, optionOff, curtton, chatbutton } from '/src/assets/icons'
import AudienceOption from './audienceoption/AudienceOption'
import ChattingBox from './ChattingBox'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../constants';
import { Button } from 'react-bootstrap'

function Audience(props) { 
  console.log(props)  
  const user = useSelector((state) => state.user.user);
  const {effectList} = props
  const [optionValue,setOptionValue] = useState(false)  
  const [chattingBoxOn, setChattingBoxOn] = useState(false)
  const [effectValue, setEffectValue] = useState(false)  
  const [effectMenu, setEffectMenu] = useState([])
  const [effectNum, setEffectNum] = useState(0)  
  const [effectBoxOn, setEffectBoxOn] = useState(false)  

  const isEffectMode = () => {
    if (effectList.filter((nickname) => nickname == user.nickname).length>0){
      return true
    } else {
      return false
    }
     
  }  

  const handleEffectMode = () => {
    setEffectValue(!effectValue)
    props.pushEffect()
  }  

  const onClickChangeOption = ()=>{
    setOptionValue(!optionValue)
  }

  const handleChattingBox = () => {
    setChattingBoxOn(!chattingBoxOn)
  }
  
  const handleEffectBox = () => {
    setEffectBoxOn(!effectBoxOn)
  }

  const onClickChangeEffectNum = (num) => {
    if (num === effectNum) {
        setEffectNum(0);
    } else {
        setEffectNum(num);
    }
}

  const userToken = useSelector((state) => state.user.token);
    
  const createEffect = async () => {
  try {
      console.log('token: ' + userToken);
      const response = await axios.get(API_BASE_URL + '/effect/', {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + userToken
        },
    });
      setEffectMenu(response.data);
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
                    {Array.from({ length: 12 }, (_, index) => {
                        if (index === 1) {
                            return (
                                <div key={index} className={`${styles.bigGridItem} ${styles.bigGrid}`}>
                                    {props.mainStreamManager !== undefined ? (
                                            <div 
                                            className={styles.streamcontainer}
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
                                            effectNum = {effectNum}
                                            effectMenu = {effectMenu}
                                            effectList = {effectList}
                                            streamManager={props.subscribers[index - !!index]} />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
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
                <div
                className={styles.option}>
                    { optionValue
                    ?
                    <div 
                    className={styles.optionbar}>
                        <div>
                            <div>
                                <AudienceOption
                                handleEffectBox = {handleEffectBox}
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

                { effectBoxOn && 
                <div 
                    className={styles.effectmenu}
                 >
                    <div
                    className={styles.effectbox}>
                    {effectMenu.map((effectoption)=>(
                        <img
                        style={ isEffectMode() && (effectoption.effectId === effectNum) ? { boxShadow:'0 0 1rem #9D72FF'} : {} }
                        key = {effectoption.effectId}
                        onClick={()=>onClickChangeEffectNum(effectoption.effectId)} 
                        className={styles.w100h100}
                        src={effectoption.effect} alt="effect_1"
                        />
                    ))}
                    </div>
                    <div>
                        { effectValue 
                        ?
                        <Button onClick={handleEffectMode}>Effect Mode On</Button>
                        :
                        <Button variant='danger' onClick={handleEffectMode}>Effect Mode Off</Button>
                        }
                    </div>
                </div>

                }
        </div>
    </>
  )
}

export default Audience
