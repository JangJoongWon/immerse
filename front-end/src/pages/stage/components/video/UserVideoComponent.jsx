import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { Container } from 'react-bootstrap';
// import './UserVideo.css';
import VideoHandler from './VideoHandler';
import { useSelector } from 'react-redux';


const UserVideoComponent = (props) => {

    // console.log(props)
    const {effectList} = props;
    const publisher = props.streamManager;
    // const effectNum = useSelector((state) => state.user.effectNum);
    const [effectNum, setEffectNum] = useState(0)
    const effectMenu = useSelector((state) => state.user.effectMenu);
    // 비디오 On/Off 함수

    const toggleVideo = () => {
        if (publisher) {
        // 영상 스트림을 얻습니다.
        const videoStream = publisher.stream.getMediaStream().getVideoTracks()[0];

        // 영상 스트림 On/Off를 토글합니다.
        videoStream.enabled = !videoStream.enabled;
        }
    };

    // 오디오 On/Off 함수
    const toggleAudio = () => {
        if (publisher) {
        // 오디오 스트림을 얻습니다.
        const audioStream = publisher.stream.getMediaStream().getAudioTracks()[0];

        // 오디오 스트림 On/Off를 토글합니다.
        audioStream.enabled = !audioStream.enabled;
        }
    };


    // effectList에 해당 유저의 닉네임이 존재하면 true를 없으면 false를 반환합니다.
    const isEffectMode = () => {
        const nickName = JSON.parse(publisher.stream.connection.data).clientData
        if (effectList.filter(data => data.nickName == nickName).length>0){  
          return true
        } else {
          return false
        }
         
      }  

    // effectList에 해당 유저의 닉네임이 존재하면 true를 없으면 false를 반환합니다.
    const checkEffect = () => {
        const nickName = JSON.parse(publisher.stream.connection.data).clientData
        const tmp = effectList.filter(data=>data.nickName === nickName) 
        if(tmp.length>0){
            setEffectNum(tmp[0].effectNum)
            // console.log(true)
        }
        else{
            // console.log(false)
        }
      };
      
      
    const getNicknameTag = () => {
          // Gets the nickName of the user
          return JSON.parse(props.streamManager.stream.connection.data).clientData;
        };
        
    

    useEffect(()=>{

        checkEffect();
        console.log('작동합니다');
    }, [effectList] )

        
    return (
        <Container style={{maxWidth: '100%', maxHeight: '100%', width: "100%", height: "100%", padding: "0" }}>
            {props.streamManager !== undefined ? (
                <div className="streamcomponent" style={{ position:"relative", width: "100%",height: '100%' }}>
                    {
                        isEffectMode() &&
                        <div 
                        style={
                            effectNum > 0 
                            ?
                            {
                            backgroundSize: '100% 100%',
                            backgroundImage : `url('${effectMenu[effectNum-1].effect}')`,
                            height:'100%',width:'100%',position:'absolute',top:'0',zIndex:'50',display:'flex',justifyContent:'center',alignItems:'center'}
                            :
                            {}
                        }
                        >
                        </div>
                    }
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                    <div
                    style={{position:"absolute",color:"white",top:"1%",left:"3%",zIndex:'75'}}
                    ><p>{getNicknameTag()}</p></div>
                    <div
                    style={{position:"absolute",color:"white",top:"5%",right:"3%"}}
                    >
                        <VideoHandler toggleVideo={toggleVideo} toggleAudio={toggleAudio} streamManager={props.streamManager} />
                    </div>
                </div>
            ) : null}
        </Container>
    );
}

export default UserVideoComponent;