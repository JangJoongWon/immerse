import { useState } from 'react';
import styles from './BroadCast.module.css';
import StageInfo from './StageInfoModal';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [stageInfoOn, setStageInfoOn] = useState(false);
  const [cardInfo, setCardInfo] = useState({})

  const navigate = useNavigate()

  const categoryMap = useSelector(state => state.category.categoryMap);
  const token = useSelector(state => state.user.token)

  const openStageInfo = async (event) => {
    event.preventDefault();
  
    // if (!token) {
    //   alert('로그인이 필요합니다.');
    //   navigate('/login');
    //   return;
    // }
  
    try {
      const response = await axios.get(`${API_BASE_URL}/shows/${data.showId}`);
      console.log('Get success:', response.data);
      setCardInfo(response.data);
      setStageInfoOn(true);
      console.log(cardInfo);
    } catch (error) {
      console.log('Get error', error);
    }
  };

  const toProfile = () => {
    navigate('/mypage/data.nickname')
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
        <div className={styles.thumbnail} onClick={openStageInfo}>
          <div className={styles.posterContainer}>
            <img
              src={`https://image.tmdb.org/t/p/original/${data.thumbnail}`}
              className={styles.poster}
              alt="Movie Poster"
            />
          </div>
        </div>
        <header>
          <div onClick={openStageInfo}><h4>{data.title}</h4></div>
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
      <StageInfo
        show={stageInfoOn}
        onHide={() => setStageInfoOn(false)}
        data={cardInfo}
      />
    </div>
  );
}

export default Card;
