// import React from 'react'
import { useEffect, useState } from 'react';
import styles from './Stage.module.css'
import StageInfo from "../../components/cards/StageInfo"

import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import { Component } from 'react';
import UserVideoComponent from '../../components/video/UserVideoComponent';
import VideoMap from '../../components/video/VideoMap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
// const APPLICATION_SERVER_URL = 'http://localhost:5000/';
// const APPLICATION_SERVER_URL = 'http://localhost:8080/';
const APPLICATION_SERVER_URL = 'http://i9d203.p.ssafy.io:8080/';

const Stage = () => {
    const { id } = useParams();

    // const [ov, setOv] = useState(undefined);
    const [ov, setOv] = useState(undefined);
    const [session, setSession] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [publisher, setPublisher] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    
    const user = useSelector((state) => state.user.token);

    const getToken = async (isAuthor) => {
        try {
            const sessionId = await (isAuthor ? createSession(id) : fetchSession(id));
            return await createToken(sessionId);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    const createSession = async (sessionId) => {
        try {
            console.log('token: ' + user);
            const response = await axios.post(APPLICATION_SERVER_URL + 'rooms/', {
                    customSessionId: sessionId
                }, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + user
                },
            });
            console.log(response.data);
            return response.data; // The sessionId
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    const fetchSession = async (sessionId) => {
        try {
            console.log('token: ' + user);
            const response = await axios.post(APPLICATION_SERVER_URL + 'rooms/' + sessionId + '/fetch', {
                    customSessionId: sessionId
                }, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + user
                },
            });
            console.log(response.data);
            return response.data; // The sessionId
        }
        catch (e) {
            console.log(e);
        }
    }

    const createToken = async (sessionId) => {
        try {
            const response = await axios.post(APPLICATION_SERVER_URL + 'rooms/' + sessionId + '/connect', {}, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user
                },
            });
            console.log(response.data);
            return response.data; // The token
        }
        catch (e) {
            console.log(e);
        }
    }

    const deleteSubscriber = (streamManager) => {
        let ls = subscribers;
        let index = ls.indexOf(streamManager, 0);
        if (index > -1) {
            ls.splice(index, 1);
            setSubscribers([...ls]);
        }
    }

    const joinSession = (isAuthor) => {
        const newOV = new OpenVidu();
        const newSession = newOV.initSession();

        // On every new Stream received...
        newSession.on('streamCreated', (event) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            let subscriber = newSession.subscribe(event.stream, undefined);
            let ls = subscribers;
            console.log('-------stream created--------');
            console.log(ls);
            ls.push(subscriber);
            setSubscribers([...ls]);
        });

        
        // On every Stream destroyed...
        newSession.on('streamDestroyed', (event) => {

            // Remove the stream from 'subscribers' array
            deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        newSession.on('exception', (exception) => {
            console.warn(exception);
        });

        getToken(isAuthor).then((token) => {
            // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
            // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
            
            console.log(token);

            newSession
            .connect(token, { clientData: 'test' })
            .then(async () => {

                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                let newPublisher = await newOV.initPublisherAsync(undefined, {
                    audioSource: undefined, // The source of audio. If undefined default microphone
                    videoSource: undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: true, // Whether you want to start publishing with your video enabled or not
                    resolution: '640x480', // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                    mirror: false, // Whether to mirror your local video or not
                });

                newSession.publish(newPublisher);

                // Obtain the current video device in use
                var devices = await newOV.getDevices();
                var videoDevices = devices.filter(device => device.kind === 'videoinput');
                var currentVideoDeviceId = newPublisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                setMainStreamManager(newPublisher);
                setPublisher(newPublisher);
                
                setOv(newOV);
                setSession(newSession);
                
                // Set the main video in the page to display our webcam and store our Publisher
                // this.setState({
                //     currentVideoDevice: currentVideoDevice,
                //     mainStreamManager: publisher,
                //     publisher: publisher,
                // });
            })
            .catch((error) => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
    }

    const leaveSession = async () => {
        if (session) {
            session.disconnect();
        }

        // Empty all properties...
        setOv(null);
        setSession(undefined);
        setSubscribers([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        
        try {
            const response = await axios.post(APPLICATION_SERVER_URL + 'rooms/' + id + '/disconnect', {}, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user
                },
            });
            console.log(response.data);
            return response.data; // NO CONTENT
        }
        catch (e) {
            console.log(e);
        }
    }

    const onBeforeUnload = () => {
        leaveSession();
    }

    const handleMainVideoStream = (stream) => {
        
    }

    const switchCamera = () => {

    }

    return (
        <div className={styles.container}>
            {session === undefined ? (
                <div id="join">
                    <StageInfo 
                    id={id}
                    joinSession={joinSession}
                    />
                </div>
            ) : null}
            {session !== undefined ? (
                <VideoMap 
                id={id}
                mainStreamManager={mainStreamManager}
                publisher={publisher}
                subscribers={subscribers}
                leaveSession={leaveSession}
                switchCamera={switchCamera}
                handleMainVideoStream={handleMainVideoStream}
                />
            ) : null}
        </div>
    );
}

export default Stage;