import { useState } from 'react';
import styles from './SearchChannel.module.css';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const goProfile = () => {
    navigate(`/mypage/${data.nickname}`)
  }

  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={goProfile}
    >
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <div className={styles.posterContainer}>
            <img
              src={data.profilePicture}
              className={styles.poster}
              alt="Channel Thumbnail"
            />
          </div>
        </div>
        <header>
            <div className={styles.channelcard}>
                <h1>{data.nickname}</h1>
                <h2>{data.email} | {data.point}</h2>
                <h3>{data.selfDescription}</h3>
            </div>
            <div>
                <Button>구독 버튼</Button>
            </div>
        </header>
      </div>
    </div>
  );
}

export default Card;
