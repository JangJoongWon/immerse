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
import { useDispatch } from 'react-redux';
import { setEffectNum, setEffectMenu } from '../../../redux/userSlice'

function Audience(props) { 
  console.log(props)  
//   const {setEffectNum} = props
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const effectNum = useSelector((state) => state.user.effectNum);
  const effectMenu = useSelector((state) => state.user.effectMenu);
  const {effectList, session} = props
  const [optionValue,setOptionValue] = useState(false)  
  const [chattingBoxOn, setChattingBoxOn] = useState(false)
  const [effectValue, setEffectValue] = useState(false)  
//   const [effectMenu, setEffectMenu] = useState([])
//   const [effectNum, setEffectNum] = useState(0)  
  const [effectBoxOn, setEffectBoxOn] = useState(false)  
  const [change, setChange] = useState(false)  
  
  const pushEffect = () => {
    session.signal({
        data: JSON.stringify({
            effectNum: effectNum
          }),
        to: [],
        type: 'effect'
    })
    .then(() => {
        console.log("send effect succassfully!");

    })
}

  const isEffectMode = () => {
    if (effectList.filter(data=>data.nickName == user.nickname).length>0){  
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
    if(optionValue){
        setEffectBoxOn(false)
    }
    setOptionValue(!optionValue)
  }

  const handleChattingBox = () => {
    setChattingBoxOn(!chattingBoxOn)
  }
  
  const handleEffectBox = () => {
    setEffectBoxOn(!effectBoxOn)
  }

  const onClickChangeEffectNum = (num) => {
    setChange(true)
    if (num === effectNum) {
        pushEffect()
        // props.changeEffectList(num)
    } else {
        // nsole.log(effectNum)
        dispatch(setEffectNum(num));
    }
}

useEffect(() => {
    // effectNum이 변경될 때 실행할 작업
    if(change){
        pushEffect();
    }
  }, [effectNum]);

  const userToken = useSelector((state) => state.user.token);
    
  const createEffect = async () => {
  try {
      // console.log('token: ' + userToken);
      const response = await axios.get(API_BASE_URL + '/effect/', {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + userToken
        },
    });
      dispatch(setEffectMenu(response.data));
      // console.log(response.data);
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
                                                    effectMenu = {effectMenu}
                                                    effectList = {effectList}
                                                    mainStreamManager={props.mainStreamManager}
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
                                            effectMenu = {effectMenu}
                                            effectList = {effectList}
                                            mainStreamManager={props.mainStreamManager}
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
                <div className={styles.effectmenu}>
                    <div className={styles.effectbox}>
                    {effectMenu.map((effectoption)=>(
                        <img
                        style={ isEffectMode() && (effectoption.effectId === effectNum) ? { boxShadow:'0 0 2rem #9D72FF'} : {} }
                        key = {effectoption.effectId}
                        onClick={()=>onClickChangeEffectNum(effectoption.effectId)} 
                        className={styles.w100h100}
                        src={effectoption.effect} alt="effect_1"
                        />
                    ))}
                    </div>
                </div>
                }
        </div>
    </>
  )
}

export default Audience
