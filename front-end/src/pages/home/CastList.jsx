// import React from 'react';
import styles from './CastList.module.css';
import Card from './BroadCast';
// import datas from '../../stage_data.json';
import { useState } from 'react';


function CardList({Live, Reserve}) {

    const [liveState, setLiveState] = useState(true);

    const liveData = Live
    const reserveData = Reserve
    
    const handleLiveButtonClick = (e) => {
      e.preventDefault();
      setLiveState(true);
    };
    
    const handleReserveButtonClick = (e) => {
      e.preventDefault();
      setLiveState(false);
    };
  
  return (
    <div className={styles.container}>

        <div className={styles.listResult}>
          {liveState ? (
            <ul className={styles.statebutton}>
              <a 
              className={styles.selected}
              href="/" onClick={handleLiveButtonClick}
              >라이브</a>
              <a 
              className={styles.notSelected}
              href="/" onClick={handleReserveButtonClick}
              >공연예정</a>
            </ul>
            ) : (
            <ul className={styles.statebutton}>
              <a 
              className={styles.notSelected}
              href="/" onClick={handleLiveButtonClick}
              >라이브</a>
              <a 
              className={styles.selected}
              href="/" onClick={handleReserveButtonClick}
              >공연예정</a>
            </ul>
            )}


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
