import React, { useState } from 'react'
import styles from './ChattingBox.module.css'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function ChattingBox({session, chats}) {

    const user = useSelector(state => state.user.user);

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

  return (
    <div className={styles.container}>

        <div className={styles.chatcontainer}>
            {chats && chats.length > 0 ? (
                chats.map((chat, i) => (
                    <div className={`${styles.chatboxcontainer} ${chat.nickname === user.nickname ? styles.mychat : styles.notmychat}`}
                    key={"chat " + i} id={"chat " + i}>
                        <div className={styles.chatingbox}>
                            <p className={styles.usernick}>{chat.nickname}  {chat.timestamp}</p>
                            <p className={styles.chatcontent}>{chat.text}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No chats available.</p>
            )}
        </div>
        
        <div className={styles.chatbox}>
            <Form.Control 
            className={`${styles.inputchat} ${styles.customInput}`}
            type="text" 
            placeholder='Enter Chat'
            value={ChatText}
            onChange={handleChatChange}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    testChat();
                }
            }} />
            {/* <button className={styles.chatbutton} onClick={testChat}>submit</button> */}
        </div>
    </div>
  )
}

export default ChattingBox