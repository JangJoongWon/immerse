import { useState } from 'react';
import styles from './BroadCast.module.css';
import StageInfo from './StageInfoModal';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../constants';
import axios from 'axios'

function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [stageInfoOn, setStageInfoOn] = useState(false);

  const [cardInfo, setCardInfo] = useState({})

  const openStageInfo = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.get(`${API_BASE_URL}/shows/${data.showId}`);
      console.log('Get success:', response.data);
      setCardInfo(response.data);
      setStageInfoOn(true)
      console.log(cardInfo)

    } catch (error) {
      console.log('Get error', error);
      // setStageInfoOn(true)
    }
  };


  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.content}
      onClick={openStageInfo}>
        <div className={styles.thumbnail}>
          <div className={styles.posterContainer}>
            <img
              src={`https://image.tmdb.org/t/p/original/${data.thumbnail}`}
              className={styles.poster}
              alt="Movie Poster"
            />
          </div>
        </div>
        <header>
          <div>{data.title}</div>
          <div>주재홍</div>
          <div className={styles.info}>{data.showProgress}</div>
        </header>
      </div>
        <footer>
          <a 
          href="/search" 
          className={styles.tagbutton}>#{data.category_id}</a>
          {/* {isHovered && <button className={styles.footerButton}>버튼</button>} */}
        </footer>
      <StageInfo
        show={stageInfoOn}
        onHide={() => setStageInfoOn(false)}
        data={cardInfo}
      />
    </div>
  );
}

export default Card;
