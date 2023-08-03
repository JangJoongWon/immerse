// import React from 'react';
import styles from './CastList.module.css';
import Card from './BroadCast';
import datas from '../../stage_data.json';
import { useState } from 'react';

function CardList() { // 컴포넌트 이름을 대문자로 변경

    const [liveState, setLiveState] = useState(true);
    
    // live상태인 데이터만 live 데이터로 저장
    const liveData = datas.filter((item) => {
      return liveState ? item.fields.state === "live" : item.fields.state === "reserved";
    });
    
    const handleLiveButtonClick = () => {
      setLiveState(true);
    };
    
    const handleReserveButtonClick = () => {
      setLiveState(false);
    };
    

  return (
    <div className={styles.container}>
        <ul className={styles.statebutton}>
          <a href="/" onClick={(event) => {
          event.preventDefault();
          handleLiveButtonClick();
          }}
          style = {liveState ? {color:'#0d6efd'} : {color:'white'}}
          >라이브  </a>

          <a href="/" onClick={(event) => {
          event.preventDefault();
          handleReserveButtonClick();
          }}
          style = {liveState ? {color:'white'} : {color:'#0d6efd'}}
          >공연예정</a>
        </ul>
        <div className={`${styles.categories} ${styles.gridMove}`}>
        {liveData.map((item) => (
            <Card key={item.pk} data={item} className={styles.card}/>
        ))}
        </div>
    </div>
  )
}

export default CardList;
