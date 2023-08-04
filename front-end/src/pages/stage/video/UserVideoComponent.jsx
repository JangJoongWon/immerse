import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { Container } from 'react-bootstrap';
// import './UserVideo.css';

const UserVideoComponent = (props) => {

    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(props.streamManager.stream.connection.data).clientData;
    }

    return (
        <Container style={{ width: "100%", height: "100%" }}>
            {props.streamManager !== undefined ? (
                <div className="streamcomponent" style={{ height: '100%' }}>
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </Container>
    );
}

export default UserVideoComponent;