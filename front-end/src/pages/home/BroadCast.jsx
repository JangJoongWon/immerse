import { useState } from 'react';
import styles from './BroadCast.module.css';
import StageInfo from './StageInfoModal';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { mainBanner } from '../../assets/images';

function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cardInfo, setCardInfo] = useState({})

  const navigate = useNavigate()

  const categoryMap = useSelector(state => state.category.categoryMap);

  const toStageInfo = async (event) => {
    event.preventDefault();
    navigate(`/stageinfo/${data.showId}`)
  };

  const toProfile = () => {
    navigate(`/mypage/${data.nickname}`)
  }

  const toCategory = (data) => {
    console.log(data)
    navigate(`/category/${data.category_id}`)
  }

  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.content}>
        <div className={styles.thumbnail} onClick={toStageInfo}>
          <div className={styles.posterContainer}>
            <img
              src={mainBanner}
              className={styles.poster}
              alt="Movie Poster"
            />
          </div>
        </div>
        <header>
          <div onClick={toStageInfo}><h4>{data.title}</h4></div>
          <div onClick={toProfile}>{data.nickname}</div>
        </header>
      </div>
        <footer>
          <a 
          href="/" 
          onClick={(event) => {
            event.preventDefault();
            toCategory(data);
          }}
          className={styles.tagbutton}>  
            #{categoryMap[data.category_id].categoryName}
          </a>
        </footer>
    </div>
  );
}

export default Card;
