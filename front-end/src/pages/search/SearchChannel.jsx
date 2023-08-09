import { useState } from 'react';
import styles from './SearchChannel.module.css';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { mainBanner } from '../../assets/images';
// import { NeonButton } from '../../components/button';

function Card({ data }) {

  const navigate = useNavigate();
  const goProfile = () => {
    // console.log(data)
    // navigate('/mypage')
    navigate(`/mypage/${data.nickname}`)
  }

  return (
    <div
      className={styles.container}
    >
      <div className={styles.content}>
        <div className={styles.thumbnail}
        onClick={goProfile}>
          <div className={styles.posterContainer}>
            <img
              src={mainBanner}
              className={styles.poster}
              alt="Channel Thumbnail"/>
          </div>
        </div>
        <div className={styles.userInfo}>
            <div className={styles.channelcard}>
              <div onClick={goProfile}>
                <p className={styles.username}>{data.nickname}</p>
                {data.selfDescription ? (
                  <p className={styles.discription}>{data.selfDescription}</p>
                ):(
                  <p className={styles.discription}>안녕하세요. {data.nickname}입니다.</p>
                )}
              </div>
              <div className={styles.subbutton}>
                  <Button>구독</Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
