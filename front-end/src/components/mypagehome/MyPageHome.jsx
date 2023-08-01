// 공연기록에서 가장 앞에 있는 포스터를 좌측 상단
// 방명록내용에서 4개를 우측 상단
// 이전 공연기록을 하단에 출력
import data from '../../stage_data.json';
import guest from '../../guest.json';
import StageCard from '../cards/stagecard';
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
    className={styles.container}>
      <Row
      className={styles.up}>
        <Col>
          <StageCard className={styles.component} data={stage_list[0]} />
        </Col>
        <Col
         className={styles.homeguestbook}>
          {guest.data.map((review) => (
            <div 
            className={styles.review} key={review.id}>
              {review.content}
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <div 
        className={styles.title}>
            이전공연기록
            <hr style={{color:"white"}}/>
        </div>
            
        {/* Display previous stage records */}
        <div
        className={styles.bottom}>
            <Row>
            {stage_list.slice(1).map((stage) => (
            <Col
            className={styles.card} 
            key={stage.id}>
                <StageCard className={styles.component} data={stage} />
            </Col>
            ))}
            </Row>
        </div>
      </Row>
    </div>
  );
}

export default MyPageHome;
