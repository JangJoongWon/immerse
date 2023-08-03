import React, { useState } from 'react'
import styles from './SearchResult.module.css'
import BroadCast from '../home/BroadCast'
import datas from '../../stage_data.json'

function SearchResult() {

    const [liveState, setLiveState] = useState(true);
    
    const handleLiveButtonClick = () => {
      setLiveState(true);
    };
    
    const handleChannelButtonClick = () => {
      setLiveState(false);
    };

//   useEffect(() => {
//     try {
//       const response1 = axios.get(`${API_URL}/shows/popular/progress`)
//       console.log('progress axios success', response1)
//     } catch (error) {
//       console.log('progress axios error : ', error.message)
//     }

//     try {
//       const response2 = axios.get(`${API_URL}/shows/popular/reservation`)
//       console.log('reservation axios success', response2)
//     } catch (error) {
//       console.log('reservation axios error : ', error.message)
//     }
//   })

  return (
    <div className={styles.container}>
        <div className={styles.toggleButton}>
            <ul className={styles.statebutton}>
            <a href="/" onClick={(event) => {
            event.preventDefault();
            handleLiveButtonClick();
            }}
            style = {liveState ? {color:'#0d6efd'} : {color:'white'}}
            >공연</a>

            <a href="/" onClick={(event) => {
            event.preventDefault();
            handleChannelButtonClick();
            }}
            style = {liveState ? {color:'white'} : {color:'#0d6efd'}}
            >채널</a>
            </ul>
        </div>

        <div className={styles.result}>
            <div className={`${styles.categories} ${styles.gridMove}`}>
                {!liveState ? (
                datas.map((item) => (
                    <BroadCast key={item.pk} data={item} className={styles.card} />
                ))
                ) : (
                datas.map((item) => (
                    <BroadCast key={item.pk} data={item} className={styles.card} />
                ))
                )}
            </div>
        </div>


    </div>
  )
}

export default SearchResult