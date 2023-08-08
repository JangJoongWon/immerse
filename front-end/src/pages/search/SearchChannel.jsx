import { useState } from 'react';
import styles from './SearchChannel.module.css';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const goProfile = () => {
    // console.log(data)
    // navigate('/mypage')
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
                <h4 style={{color: 'white'}}>{data.nickname}</h4>
                <p>{data.selfDescription}</p>
            </div>
            <div>
                <Button>구독</Button>
            </div>
        </header>
      </div>
    </div>
  );
}

export default Card;
