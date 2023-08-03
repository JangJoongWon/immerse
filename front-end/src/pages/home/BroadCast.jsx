import { useState } from 'react';
import styles from './BroadCast.module.css';
import StageInfo from './StageInfoModal';

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
              src={`https://image.tmdb.org/t/p/original/${data.fields.poster_path}`}
              className={styles.poster}
              alt="Movie Poster"
            />
          </div>
        </div>
        <header>
          <div>{data.fields.title}</div>
          <div>주재홍</div>
          <div className={styles.info}>{data.fields.description}</div>
        </header>
      </div>
        <footer>
          <a 
          href="/search" 
          className={styles.tagbutton}>#{data.fields.genre}</a>
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
