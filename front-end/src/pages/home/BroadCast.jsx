import { useState } from 'react';
import styles from './BroadCast.module.css';
import StageInfo from './StageInfoModal';
import { useSelector } from 'react-redux';

function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [stageInfoOn, setStageInfoOn] = useState(false);

  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.content}
      onClick={() => setStageInfoOn(true)}>
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
      />
    </div>
  );
}

export default Card;
