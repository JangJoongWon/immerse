import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { Container } from 'react-bootstrap';
// import './UserVideo.css';
import VideoHandler from './VideoHandler';

const UserVideoComponent = (props) => {

    const publisher = props.streamManager
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


    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(JSON.parse(props.streamManager.stream.connection.data).clientData).nickname;
    }

    return (
        <Container style={{maxWidth: '100%', maxHeight: '100%', width: "100%", height: "100%", padding: "0" }}>
            {props.streamManager !== undefined ? (
                <div className="streamcomponent" style={{ position:"relative", width: "100%",height: '100%' }}>
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                    <div
                    style={{position:"absolute",color:"white",top:"1%",left:"3%"}}
                    ><p>{getNicknameTag()}</p></div>
                    <div
                    style={{position:"absolute",color:"white",top:"5%",right:"3%"}}
                    >
                        <VideoHandler toggleVideo={toggleVideo} toggleAudio={toggleAudio} />
                    </div>
                </div>
            ) : null}
        </Container>
    );
}

export default UserVideoComponent;