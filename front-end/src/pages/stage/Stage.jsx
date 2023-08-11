// import React from 'react'
import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Stage.module.css'

import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../constants';
import { Audience, Performer, Loading, ChattingBox } from './components';
import { Button, Form } from 'react-bootstrap';

const Stage = () => {
    const { id } = useParams(); // session id는 show_id로 설정 (겹치는 일이 없도록!)
    const navigate = useNavigate();

    const ov = useRef(new OpenVidu()); 
    const [subscribers, setSubscribers] = useState([]);
    const [publisher, setPublisher] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [session, setSession] = useState(undefined);
    const [showData, setShowData] = useState({});
    const [chats, setChats] = useState([]);

    const userToken = useSelector((state) => state.user.token);
    const user = useSelector(state => state.user.user);

    const isAuthor = () => user.nickname === showData.nickname; 

    const getToken = async () => {
        try {
            const sessionId = await createSession(id);
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

    const createToken = async (sessionId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/rooms/${sessionId}/connect`, {}, {
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

        if (nickname === showData.nickname) setMainStreamManager(streamManager);
        else setSubscribers(subscribers => [...subscribers, streamManager]);
    }

    const deleteSubscriber = useCallback(streamManager => {
        const nickname = JSON.parse(streamManager.stream.connection.data).clientData;
        if (nickname === showData.nickname) {
            setMainStreamManager(undefined);
        }
        else {
            setSubscribers(prevSubcsribers => {
                const index = prevSubcsribers.indexOf(streamManager, 0);
                if (index > -1) {
                    const ls = [...prevSubcsribers];
                    ls.splice(index, 1);
                    return ls;
                }
                return prevSubcsribers;
            });
        }
    }, []);

    const pushPublisher = (p) => {
        setPublisher(prev => p);
    }

    const joinSession = () => {
        const newSession = ov.current.initSession();

        // On every new Stream received...
        newSession.on('streamCreated', (event) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            const subscriber = newSession.subscribe(event.stream, undefined);
            addSubscriber(subscriber);
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

        newSession.on('signal:force-mute', event => {
            console.log(event);
            console.log(publisher)
            if (publisher) {
                console.log("cam off");
                publisher.stream.getMediaStream().getVideoTracks()[0].enabled = false;
            }
        });

        // newSession.on('signal:chat', event => {
        //     const newChat = {
        //         // from: event.from,
        //         message: event.data
        //     };
        //     pushChat(newChat);
        // });

        newSession.on('signal:chat', event => {
            try {
                const chatData = JSON.parse(event.data);
                console.log('chatData:', chatData)
                // const newChat = {
                //     // from: chatData.from,
                //     message: chatData.message
                // };
                pushChat(chatData);
            } catch (error) {
                console.error('Error parsing chat data:', error);
            }
        });

        getToken().then((token) => {
            newSession
            .connect(token, { clientData: user.nickname })
            .then(async () => {

                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                const newPublisher = await ov.current.initPublisherAsync(undefined, {
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
                var devices = await ov.current.getDevices();
                var videoDevices = devices.filter(device => device.kind === 'videoinput');
                var currentVideoDeviceId = newPublisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                console.log(newPublisher);
                pushPublisher(newPublisher);
                console.log(publisher);
                addSubscriber(newPublisher);
                setSession(newSession);
            })
            .catch((error) => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
    }

    const leaveSession = useCallback(() => {
        console.log('--------leave--------');
        if (session) {
            session.disconnect();
        }
        ov.current = new OpenVidu();
        setSession(undefined);
        setSubscribers([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);

        const fetch = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/rooms/${id}/${isAuthor() ? 'terminate' : 'disconnect'}`, {}, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    },
                });
                console.log(response.data);

                if (isAuthor()) {
                    const res = await axios.put(`${API_BASE_URL}/shows/${id}/finish`, {}, {
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + userToken
                        },
                    });
                    console.log(res.data);
                }

                // setShowData({});
                return response.data; // NO CONTENT
            }
            catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [session]);

    const muteAllCams = () => {
        session.signal({
            data: "mute!",
            to: [], // empty to all
            type: "force-mute"
        })
        .then(() => {
            console.log("all muted");
        });
    }

    const [ChatText, setChatText] = useState('')
    const handleChatChange = (e) => {
        setChatText(e.target.value);
      };

    const testChat = () => {

        // 현재 시간
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours}:${minutes}`;

        const chatData = {
            text: ChatText,
            nickname: user.nickname,
            timestamp: formattedTime
        };

        session.signal({
            data: JSON.stringify(chatData),
            to: [],
            type: "chat"
        })
        .then(() => {
            console.log("sent successfully!");
            setChatText('');
        });
    };

    // const testChat = () => {
    //     session.signal({
    //         data: 'test from' + user.nickname + Date.now(),
    //         to: [],
    //         type: "chat"
    //     })
    //     .then(() => {
    //         console.log("sent successfully!");
    //     });
    // }
    const pushChat = (newChat) => {
        setChats(prev => [...prev, newChat]);
    }

    const popState = () => {
        leaveSession();
        navigate(-1);
    }

    const fetchData = async () => {
        const response = await axios.get(`${API_BASE_URL}/shows/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        });
        console.log(response.data);
        setShowData(response.data);
        // joinSession(false); // 방에 들어오면 바로 시작. 임시로 false 할당
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (showData.user_id)
            joinSession();
    }, [showData.user_id]); // showData를 불러왔을 때만 딱 한 번 joinSession을 자동으로 호출

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event;
            leaveSession();
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        // window.addEventListener('popstate', handleBeforeUnload);
        window.onpopstate = handleBeforeUnload;

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // window.removeEventListener('popstate', handleBeforeUnload);
            // window.onpopstate = () => {}; 
        }
    }, [leaveSession]);

    useEffect(() => {
        console.log(chats);
    }, [chats]);

    return (
        <div className={styles.container}>
            {session !== undefined ?
                    <>
                {isAuthor() ? 
                    <Performer
                    publisher={publisher}
                    mainStreamManager={mainStreamManager}
                    subscribers={subscribers}
                    session={session} chats={chats}
                    />
                    :
                    <Audience 
                    publisher={publisher}
                    mainStreamManager={mainStreamManager}
                    subscribers={subscribers}
                    leaveSession={popState}
                    session={session} chats={chats}
                    />}  
                    {/* <ChattingBox session={session} chats={chats}/> */}
                    </> 
                : <Loading showData={showData} />}

                {/* <div className={styles.chatbox}>
                    <Form.Control 
                    className={styles.inputchat}
                    type="text" 
                    value={ChatText}
                    onChange={handleChatChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            testChat();
                        }
                    }} />
                    <Button className={styles.chatbutton} onClick={testChat}>submit</Button>
                </div>

            <div className={styles.chatcontainer}>
                {chats.map((chat, i) => {
                    return (
                        <div 
                          className={styles.chatingbox} 
                          key={"chat " + i} id={"chat " + i}>
                            <p>작성자 : {chat.nickname}</p>
                            <p>내용 : {chat.text}</p>
                            <p>시간 : {chat.timestamp}</p>
                        </div>
                    )
                })}
            </div> */}

        </div>
    );
}

export default Stage;