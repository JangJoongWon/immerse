import React from 'react';
import {useState, useEffect} from 'react'
import Card from '../../search/SearchChannel'
import axios from 'axios';
import { API_BASE_URL } from '../../../constants';
import styles from './SubscribeList.module.css'

function SubscribeList(props) {
  const {userId} = props 
  const [list, setList] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 불러옴
      axios.get(API_BASE_URL + `/subscribe/following/${userId}`, { userId: userId })
      .then(response => {
        setList(response.data); // 불러온 데이터를 상태(State)에 저장
        // console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[]);

  return (
    <div 
    className={styles.container}>
      <div
        className={styles.gridItem}>
        {
            list.map((channel) => (
              <Card 
              className ={styles.card}
              key = {channel.email}
              data={channel}/>
            ))
        }
      </div>
    </div>
  )
}

export default SubscribeList