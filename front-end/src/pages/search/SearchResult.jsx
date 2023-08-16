import { useState, useEffect } from 'react'
import styles from './SearchResult.module.css'
import BroadCast from '../home/BroadCast'
import { API_BASE_URL } from '../../constants';
import axios from 'axios';
import ChannelCard from './SearchChannel'

function SearchResult({word}) {

    const [liveState, setLiveState] = useState(true);
    const [searchShow, setSearchShow] = useState([]);
    const [searchUser, setSearchUser] = useState([]);
    const [showCount, setShowCount] = useState([]);
    const [userCount, setUserCount] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        // console.log('word:', word)
        try {
          const response = await axios.get(`${API_BASE_URL}/search/show/${word}`);
          // console.log('show:', response)
          setSearchShow(response.data);
          setShowCount(response.data.length);
          // console.log(response.data.length)
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
        try {
          const response = await axios.get(`${API_BASE_URL}/search/user/${word}`);
          // console.log('user:', response)
          setSearchUser(response.data);
          setUserCount(response.data.length);
          // console.log(response.data.length)
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
  
      fetchData();
    }, [word]); // word가 변경될 때마다 API 요청을 다시 보냄
    
    const handleLiveButtonClick = () => {
      setLiveState(true);
    };
    
    const handleChannelButtonClick = () => {
      setLiveState(false);
    };

  return (
    <div className={styles.container}>
        <div className={styles.toggleButton}>
            {liveState ? (
              <ul className={styles.statebutton}>
                <a href="/" onClick={(event) => {
                  event.preventDefault();
                handleLiveButtonClick();
                }}
                className={styles.selected}
                >공연</a>
  
                <a href="/" onClick={(event) => {
                event.preventDefault();
                handleChannelButtonClick();
                }}
                className={styles.notSelected}
                >채널</a>
              </ul>
                ) : (
              <ul className={styles.statebutton}>
                <a href="/" onClick={(event) => {
                event.preventDefault();
                handleLiveButtonClick();
                }}
                className={styles.notSelected}
                >공연</a>
  
                <a href="/" onClick={(event) => {
                event.preventDefault();
                handleChannelButtonClick();
                }}
                className={styles.selected}
                >채널</a>
              </ul>
            )}
        </div>

        <div className={styles.result}>
          {liveState ? (
            <h3>{showCount}개의 공연</h3>) : (<h3>{userCount}개의 채널</h3>)}

          <div className={`${styles.categories} ${styles.gridItem}`}>
          {liveState ? (
            searchShow.map((item) => (
              <BroadCast key={item.showId} data={item} className={styles.card} />
            ))
          ) : (
            searchUser.map((item) => (
              <ChannelCard key={item.userId} data={item} className={styles.channelcard} />
            ))
          )}
          </div>
        </div>



    </div>
  )
}

export default SearchResult