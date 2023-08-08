// import React from 'react'
import { useEffect, useState, useRef } from 'react';
import styles from './Stage.module.css'
import StageInfo from "../../components/cards/StageInfo"

import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSession, setShowData } from '../../redux/sessionSlice';
import { API_BASE_URL } from '../../constants';
import { Audience, Performer } from './components';
import { Button } from 'react-bootstrap';

const Stage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ov, setOv] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [publisher, setPublisher] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    
    const prevSession = useRef(undefined);
    
    const userToken = useSelector((state) => state.user.token);
    const user = useSelector(state => state.user.user);
    const session = useSelector(state => state.session.session);
    const showData = useSelector(state => state.session.showData);
    const dispatch = useDispatch();

    const isAuthor = () => user.nickname === showData.nickname; // session id는 공연자의 id로 설정

    const getToken = async (isAuthor) => {
        try {
            const sessionId = await (isAuthor ? createSession(showData.user_id + '') : fetchSession(showData.user_id + ''));
            return await createToken(sessionId);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    const createSession = async (sessionId) => {
        try {
            console.log('token: ' + userToken);
            const response = await axios.post(API_BASE_URL + '/rooms/', {
                    customSessionId: sessionId
                }, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + userToken
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
            console.log('token: ' + userToken);
            const response = await axios.post(API_BASE_URL + '/rooms/' + sessionId + '/fetch', {
                    customSessionId: sessionId
                }, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + userToken
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
            const response = await axios.post(API_BASE_URL + '/rooms/' + sessionId + '/connect', {}, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            });
            console.log(response.data);
            return response.data; // The token
        }
        catch (e) {
            console.log(e);
        }
    }

    const addSubscriber = (streamManager) => {
        const nickname = JSON.parse(streamManager.stream.connection.data).clientData;
            
        if (nickname === showData.nickname) { // mainStream
            setMainStreamManager(streamManager);
        }
        else {
            let ls = subscribers;
            console.log(ls);
            
            ls.push(streamManager);
            setSubscribers([...ls]);
        }
    }

    const deleteSubscriber = (streamManager) => {
        const nickname = JSON.parse(streamManager.stream.connection.data).clientData;
         
        if (nickname === showData.nickname) {
            setMainStreamManager(undefined);
        }
        else {
            let ls = subscribers;
            let index = ls.indexOf(streamManager, 0);
            if (index > -1) {
                ls.splice(index, 1);
                setSubscribers([...ls]);
            }
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
            
            console.log('-------stream created--------');
            if (subscriber) addSubscriber(subscriber.stream.streamManager);
            // console.log(event.stream);
            // console.log(subscriber);
            // console.log(subscriber.stream);
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
            .connect(token, { clientData: user.nickname })
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

                console.log(newPublisher);
                // if (user.nickname === id)
                //     setMainStreamManager(newPublisher);
                // setPublisher(newPublisher);
                addSubscriber(newPublisher);
                
                setOv(newOV);
                dispatch(setSession(newSession));
                
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
        console.log(session);
        if (session) {
            session.disconnect();
        }

        // Empty all properties...
        setOv(null);
        dispatch(setSession(undefined));
        setSubscribers([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        console.log("cleaned!")
        
        try {
            const response = await axios.post(API_BASE_URL + '/rooms/' + showData.user_id + '/disconnect', {}, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            });
            console.log(response.data);
            dispatch(setShowData({}));
            return response.data; // NO CONTENT
        }
        catch (e) {
            console.log(e);
        }
    }

    const onBeforeUnload = () => {
        console.log('------------clean up!------------');
        leaveSession();
    }

    const handleMainVideoStream = (stream) => {
        // if (this.state.mainStreamManager !== stream) {
        //     this.setState({
        //         mainStreamManager: stream
        //     });
        // }
    }

    const switchCamera = () => {
        // try {
        //     const devices = await this.OV.getDevices()
        //     var videoDevices = devices.filter(device => device.kind === 'videoinput');

        //     if (videoDevices && videoDevices.length > 1) {

        //         var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

        //         if (newVideoDevice.length > 0) {
        //             // Creating a new publisher with specific videoSource
        //             // In mobile devices the default and first camera is the front one
        //             var newPublisher = this.OV.initPublisher(undefined, {
        //                 videoSource: newVideoDevice[0].deviceId,
        //                 publishAudio: true,
        //                 publishVideo: true,
        //                 mirror: true
        //             });

        //             //newPublisher.once("accessAllowed", () => {
        //             await this.state.session.unpublish(this.state.mainStreamManager)

        //             await this.state.session.publish(newPublisher)
        //             this.setState({
        //                 currentVideoDevice: newVideoDevice[0],
        //                 mainStreamManager: newPublisher,
        //                 publisher: newPublisher,
        //             });
        //         }
        //     }
        // } catch (e) {
        //     console.error(e);
        // }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_BASE_URL}/shows/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            });
            console.log(response.data);
            dispatch(setShowData(response.data));
        }
        // if (!userToken) navigate('/login');
        dispatch(setSession(undefined));
        dispatch(setShowData({}));
        fetchData();

        // window.addEventListener('beforeunload', onBeforeUnload);
        window.addEventListener('popstate', onBeforeUnload);
        return () => {
            if (session) {
                session.disconnect();
            }
            // window.removeEventListener('beforeunload', onBeforeUnload); 
            // window.removeEventListener('popstate', onBeforeUnload);
        };
    }, []);

    useEffect(() => {
        console.log('------------session changed--------------')
        console.log(prevSession.current);
        if (prevSession.current) {
            console.log('---------disconnect-----------');
            prevSession.current.disconnect();
        }

        console.log(session);

        prevSession.current = session;

    }, [session]);

    return (
        <div className={styles.container}>
            {session === undefined ? (
                <div id="join">
                    <StageInfo 
                    showData={showData}
                    joinSession={joinSession}
                    />
                </div>
            ) : null}
            {session !== undefined ?
                 isAuthor() ? 
                     (
                        <Performer
                        publisher={publisher}
                        mainStreamManager={mainStreamManager}
                        subscribers={subscribers}
                        />
                    ) 
                   : (
                        <Audience 
                        publisher={publisher}
                        mainStreamManager={mainStreamManager}
                        subscribers={subscribers}
                        />
                )
            : null}
            <Button onClick={leaveSession}>Leave</Button>
        </div>
    );
}

export default Stage;