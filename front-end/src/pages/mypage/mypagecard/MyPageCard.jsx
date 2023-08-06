import { useState } from 'react';
import styles from './MyPageCard.module.css';
import { Button } from 'react-bootstrap';

function MyPageCard({ data }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  return (
    <div
      className={styles.container}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >

      <div
      style={{
        borderRadius:'10%',
        height:'15rem',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.fields.poster_path})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}>
        { (data.fields.state === 'live') && (<div>
          <span
          className={styles.font}
          style={{color:'red',marginLeft:"5%"}}
          >●</span>
          <span
          className={styles.font}
          style={{color:'white',marginLeft:"2%"}}
          >
            Live
          </span>
        </div>)}
        { (data.fields.state === 'reserved') && (<div>
          <span
          className={styles.font}
          style={{color:'gold',marginLeft:"5%"}}
          >●</span>
          <span
          className={styles.font}
          style={{color:'white',marginLeft:"2%"}}
          >
            Reserved
          </span>
        </div>)}
      </div>


      {hovered && (
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>{data.fields.title}</h3>
          </div>

          {/* 버튼 생성 부분 수정 */}
          {data.fields.state === "live" && (
            <div className={styles.button}>
              <Button variant="danger">입장</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyPageCard;
