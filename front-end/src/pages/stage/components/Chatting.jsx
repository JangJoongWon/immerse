import React, { useState } from 'react'
import styles from './Chatting.module.css'

function Chatting() {

    
    // let handleChannelMessage = async (messageData, MemberId) => {
    //     console.log('A new message was received')
    //     let data = JSON.parse(messageData.text)
    
    //     if(data.type === 'chat'){
    //         addMessageToDom(data.displayName, data.message)
    //     }
    
    //     if(data.type === 'user_left'){
    //         document.getElementById(`user-container-${data.uid}`).remove()
    
    //         if(userIdInDisplayFrame === `user-container-${uid}`){
    //             displayFrame.style.display = null
        
    //             for(let i = 0; videoFrames.length > i; i++){
    //                 videoFrames[i].style.height = '300px'
    //                 videoFrames[i].style.width = '300px'
    //             }
    //         }
    //     }
    // }
    
    // let sendMessage = async (e) => {
    //     e.preventDefault()
    
    //     let message = e.target.message.value
    //     channel.sendMessage({text:JSON.stringify({'type':'chat', 'message':message, 'displayName':displayName})})
    //     addMessageToDom(displayName, message)
    //     e.target.reset()
    // }
    
    // let addMessageToDom = (name, message) => {
    //     let messagesWrapper = document.getElementById('messages')
    
    //     let newMessage = `<div class="message__wrapper">
    //                         <div class="message__body">
    //                             <strong class="message__author">${name}</strong>
    //                             <p class="message__text">${message}</p>
    //                         </div>
    //                     </div>`
    
    //     messagesWrapper.insertAdjacentHTML('beforeend', newMessage)
    
    //     let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
    //     if(lastMessage){
    //         lastMessage.scrollIntoView()
    //     }
    // }





    // session 전달받아와서 실행
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (session && message.trim() !== '') {
            session.signal({
                data: message,
            });
            setMessage('');
        }
    };
  return (
    <div className={styles.container}>
        <div className={styles.chattingbox}>
            <div className={styles.chatMessages}>
                {chatMessages.map((msg, index) => (
                    <div key={index} className={styles.chatMessage}>
                        <span className={styles.chatAuthor}>{msg.connection}: </span>
                        <span className={styles.chatText}>{msg.data}</span>
                    </div>
                ))}
            </div>
            <div className={styles.chatInput}>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chatting