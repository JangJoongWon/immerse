// import React from 'react';
import styles from './CastList.module.css';
import Card from './BroadCast';
// import datas from '../../stage_data.json';
import { useState } from 'react';


function CardList({Live, Reserve}) {

    const [liveState, setLiveState] = useState(true);

    const liveData = Live
    const reserveData = Reserve
    
    const handleLiveButtonClick = () => {
      setLiveState(true);
    };
    
    const handleReserveButtonClick = () => {
      setLiveState(false);
    };
  
  return (
    <div className={styles.container}>

        <div className={styles.listResult}>
          <ul className={styles.statebutton}>
            <a href="/" onClick={(event) => {
            event.preventDefault();
            handleLiveButtonClick();
            }}
            style = {liveState ? {color:'#8b00ff'} : {color:'white'}}
            >라이브  </a>

            <a href="/" onClick={(event) => {
            event.preventDefault();
            handleReserveButtonClick();
            }}
            style = {liveState ? {color:'white'} : {color:'#8b00ff'}}
            >공연예정</a>
          </ul>

          <div className={`${styles.popularList} ${styles.gridMove}`}>
          {liveState ? (
            liveData.map((item) => (
              <Card key={item.showId} data={item} className={styles.card}/>
            ))
          ) : (
            reserveData.map((item) => (
              <Card key={item.showId} data={item} className={styles.card}/>
            ))
          )}
          </div>

        </div>

    </div>
  )
}

export default CardList;
