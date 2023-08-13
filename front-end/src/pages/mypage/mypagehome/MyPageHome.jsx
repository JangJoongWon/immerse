// 공연기록에서 가장 앞에 있는 포스터를 좌측 상단
// 방명록내용에서 4개를 우측 상단
// 이전 공연기록을 하단에 출력
import MyPageCard from '../mypagecard/MyPageCard';
import { Row, Col } from 'react-bootstrap';
import styles from './MyPageHome.module.css';
import ReservationTicket from '../reservationticket/ReservationTicket';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {API_BASE_URL, TEST_URL} from '../../../constants/index'
import { useSelector } from 'react-redux';
import { mainBanner } from '/src/assets/images';
import MyCarousel from './MyCarousel';


function MyPageHome(props) {

  const userToken = useSelector((state)=>state.user.token)
  const user = useSelector((state)=>state.user.user)
  const [list,setList] = useState([])
  const [schedule,setSchedule] = useState([])

  
  useEffect(() => {
    if (userToken){
      // Axios를 사용하여 데이터를 불러옴
        axios.get(API_BASE_URL + '/shows/', {
                  headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': 'Bearer ' + userToken
                  },
              })
        .then(response => {
          const tmp = response.data.filter((show) => show.user_id == user.userId )
          setList(tmp); // 불러온 데이터를 상태(State)에 저장
  
          console.log(tmp)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  
        axios.get(API_BASE_URL + `/reservation/user/${user.userId}`, {
          headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + userToken
          },
        })
        .then(response => {
        setSchedule(response.data); // 불러온 데이터를 상태(State)에 저장
        console.log(response.data)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });

    }
    },[]);

  return (
    <div
    style={{justifyContent:'start'}}
    className={styles.container}>
      <Row
      className={styles.up}>
        <Col
        style={{padding:'0'}}
        >
          <div 
          className={styles.title}>
              <h5>
                <th>최근 공연</th>
              </h5>
              <hr style={{color:"white"}}/>
          </div>
          <div
            className={styles.posterbox}
            style={{width:'90%',marginTop:'6%'}}
            >
              <MyCarousel data={list.slice(0,3)} />
          </div>
        </Col>
        <Col>
        
          <div 
          className={styles.schedule}>
              <h5>
              <th>예약한 공연</th>
              </h5>
              <hr style={{color:"white"}}/>
          </div>      

          <div>
            <Row 
            className={styles.ticketbox}
            >
              {/* data.map 메소드를 사용하여 ReservationTicket 컴포넌트들을 그리드 형태로 배치 */}
              {schedule.slice(0,3).map((data) => (
                <Col sm={8} key={data.title}>
                  <ReservationTicket data={data} />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        {/* <Col>
          <div 
          className={styles.title}>
              <h5>
               <th>방명록</th>
              </h5>
              <hr style={{color:"white"}}/>
          </div>
          <div
          style={{width:'100%',height:'30rem', overflow:"hidden", paddingRight:'10%'}}
          >  
            <div
              style={{width:'100%',height:'80%'}}
              className={styles.homeguestbook}>
              {guest.data.slice(0,5).map((review) => (
                <div 
                  style={{margin:'4%',border:"0.9rem solid white"}}
                  className={styles.review} key={review.id}>
                  {review.content}
                </div>
              ))}
            </div>
          </div>
        </Col> */}
      </Row>

      <Row
        style={{marginTop:'4%' ,marginBottom:'8%'}}>
        <div 
        className={styles.title}>
            <h5>
            <th>이전공연기록</th>
            </h5>
            <hr style={{color:"white"}}/>
        </div>
            
        {/* Display previous stage records */}
        <div
        className={styles.bottom}>
            <Row
            className={styles.cardbox}>
            {list.slice(3,6).map((show) => (
                  <MyPageCard 
                  key={show.title}
                  className={styles.card} 
                  show={show} />
            ))}
            </Row>
        </div>
      </Row>
    </div>
  );
}

export default MyPageHome;
