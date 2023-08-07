// import React from 'react';
import styles from './CastList.module.css';
import Card from './BroadCast';
// import datas from '../../stage_data.json';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CardList({Live, Reserve}) {

    const [liveState, setLiveState] = useState(true);
    const categories = useSelector(state => state.category.categories);

    const liveData = Live
    const reserveData = Reserve
    const navigate = useNavigate();
    
    const handleLiveButtonClick = () => {
      setLiveState(true);
    };
    
    const handleReserveButtonClick = () => {
      setLiveState(false);
    };

    const toCategory = (id) => {
      navigate(`/category/${id}`)
    }
  
  return (
    <div className={styles.container}>

        {/* <div className={styles.categoryTags}>
          <ul className={styles.categoryZip}>
            {categories.map((item) => (
              <div key={item.categoryId}>
                <a href="/" 
                  onClick={(event) => {
                  event.preventDefault();
                  toCategory(item.categoryId);
                }}>{item.categoryName}</a>
              </div>
            ))}
          </ul>
        </div> */}

        <div className={styles.listResult}>
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
