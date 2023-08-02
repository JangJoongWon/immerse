// 공연기록에서 가장 앞에 있는 포스터를 좌측 상단
// 방명록내용에서 4개를 우측 상단
// 이전 공연기록을 하단에 출력
import data from '../../../stage_data.json';
import guest from '../../../guest.json';
import MyPageCard from '../mypagecard/MyPageCard';
import BigMyPageCard from '../mypagecard/BigMyPageCard';
import { Row, Col } from 'react-bootstrap';
import styles from './MyPageHome.module.css';

function MyPageHome(props) {
  var { user_id } = props;
  var stage_list = data.filter((stage) => {
    return user_id === stage.fields.user_id;
  });

  // Sort stage_list by date in descending order (most recent first)
  stage_list.sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));

  return (
    <div
    style={{justifyContent:'center'}}
    className={styles.container}>
      <Row
      className={styles.up}>
        <Col
        >
          <div 
          className={styles.title}>
              <th>최근 공연</th>
              <hr style={{color:"white"}}/>
          </div>
          <div
            className={styles.posterbox}
            style={{width:'90%',height:'30rem'}}
            >
            <img
              style={{width:'100%',height:'90%', padding: '5% 10%'}}
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original/${stage_list[0].fields.poster_path}`}
              alt="None"
            />
          </div>
        </Col>
        <Col>
          <div 
          className={styles.title}>
              <th>방명록</th>
              <hr style={{color:"white"}}/>
          </div>
          <div
          style={{width:'100%',height:'30rem', overflow:"hidden", paddingRight:'10%'}}
          >  
            <div
              style={{width:'100%',height:'80%'}}
              className={styles.homeguestbook}>
              {guest.data.map((review) => (
                <div 
                  style={{margin:'4%',border:"1rem solid white"}}
                  className={styles.review} key={review.id}>
                  {review.content}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row
        style={{marginTop:'4%', marginBottom:'8%'}}>
        <div 
        className={styles.title}>
            <th>이전공연기록</th>
            <hr style={{color:"white"}}/>
        </div>
            
        {/* Display previous stage records */}
        <div
        className={styles.bottom}>
            <Row>
            {stage_list.slice(1).map((stage) => (
                  <MyPageCard 
                  key={stage.id}
                  className={styles.component} data={stage} />

            ))}
            </Row>
        </div>
      </Row>
    </div>
  );
}

export default MyPageHome;
