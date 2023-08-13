import { useState } from 'react';
import styles from './MyPageCard.module.css';
import { Button } from 'react-bootstrap';
import { mainBanner } from '/src/assets/images';
import { useNavigate } from 'react-router-dom';

function MyPageCard(props) {
  
  const {show} = props
  // console.log(show.thumbnail)
  // console.log(show)
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate()
  
  const toStageInfo = async (event) => {
    event.preventDefault();
    navigate(`/stageinfo/${show.showId}`)
  };

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
      {/* <img src={show.thumbnail} alt="thumbnail" /> */}
      <div
      style={{
        border : '1px solid white',
        borderRadius:'10%',
        height:'17rem',
        backgroundImage: `url(${show.thumbnail})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}>
        { (show?.showProgress === 'IN_PROGRESS') 
        && (<div
          className={`${styles.blinkingtext} ${styles.statebox}`}
          >
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
        { (show?.showProgress === 'SCHEDULED') 
        && (<div
          className={`${styles.blinkingtext} ${styles.statebox}`}
        >
          <span
          className={styles.title}
          style={{color:'gold',marginLeft:"5%"}}
          >●</span>
          <span
          className={styles.title}
          style={{color:'white',marginLeft:"2%"}}
          >
            Reserved
          </span>
        </div>)}
        {hovered && 
        <div>
          <div className={styles.content}>
            <div className={styles.title}>
              <h3>{show.title}</h3>
              <h5>{show.nickname}</h5>
            </div>
            {show?.showProgress === "IN_PROGRESS" && (
              <div className={styles.button}>
                <Button onClick={toStageInfo} variant="danger">입장</Button>
              </div>
            )}
        </div>
        </div>
        }
      </div>

    </div>
  );
}

export default MyPageCard;
