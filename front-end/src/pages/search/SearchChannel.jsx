import { useState, useEffect } from 'react';
import styles from './SearchChannel.module.css';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { mainBanner } from '../../assets/images';
// import { NeonButton } from '../../components/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TEST_URL, API_BASE_URL } from '../../constants';

function Card({ data }) {
  const userToken = useSelector((state) => state.user.token);
  const [subscription, setSubscription] = useState(false);


  useEffect(() => {
      checksubscription(data.userId)

  }, []);

  const checksubscription = (followingId) => {

    axios.get(API_BASE_URL + `/subscribe/check/${followingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
      setSubscription(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }

  const cancelsubscription = () => {

    axios.delete(API_BASE_URL + `/subscribe/${data.userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
      checksubscription(data.userId)
      console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const subscribe = () => {

    if (!userToken) {
      navigate('/login')
    } else {
      axios.post(API_BASE_URL + '/subscribe', {
        userId: data.userId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      },)
        .then(response => {
          // setUser(response.data);
          checksubscription(data.userId)
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }

  const navigate = useNavigate();
  const goProfile = () => {
    // console.log(data)
    // navigate('/mypage')
    navigate(`/mypage/${data.nickname}`)
  }

  return (
    <div
      className={styles.container}
    >
      <div className={styles.content}>
        <div className={styles.thumbnail}
        onClick={goProfile}>
          <div className={styles.posterContainer}>
            <img
              src={mainBanner}
              className={styles.poster}
              alt="Channel Thumbnail"/>
          </div>
        </div>
        <div className={styles.userInfo}>
            <div className={styles.channelcard}>
              <div onClick={goProfile}>
                <p className={styles.username}>{data.nickname}</p>
                {data.selfDescription ? (
                  <p className={styles.discription}>{data.selfDescription}</p>
                ):(
                  <p className={styles.discription}>안녕하세요. {data.nickname}입니다.</p>
                )}
              </div>
              <div className={styles.subbutton}>
                  {subscription 
                  ?
                  <button
                  onClick={cancelsubscription}
                  className={styles.delsubutton}
                  >구독 취소</button>
                  :
                  <button
                  onClick={subscribe}
                  className={styles.subutton}
                  >구독</button>
                  }
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
