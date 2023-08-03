import { useState } from 'react';
import styles from './BroadCast.module.css';

function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.content}>
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
        <footer>
          <a 
          href="/search" 
          className={styles.tagbutton}>#{data.fields.genre}</a>
          {/* {isHovered && <button className={styles.footerButton}>버튼</button>} */}
        </footer>
      </div>
    </div>
  );
}

export default Card;
