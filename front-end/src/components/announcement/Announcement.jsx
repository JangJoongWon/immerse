// import React from 'react'; // JSX 문법을 사용하기 위해 React를 임포트합니다.
import styles from "./Announcment.module.css"
import anouncements_data from "../../anouncements_data.json";
import {Row,Col} from "react-bootstrap"


function Announcement(props) {
    var {user_id, nickname} = props
  // 사용자의 user_id에 해당하는 공지사항을 필터링하여 selected_announcements 배열에 저장합니다.
  const selected_announcements = anouncements_data.filter((props) => {
    return props.user_id === user_id;
  });

  return (
    <div
    className={styles.container} 
    >
      {/* 필터링된 공지사항을 map 함수를 사용하여 출력합니다. */}
      {selected_announcements.map((data) => (
        <div 
        className={styles.box}
        key={data.id}
        > {/* 각 공지사항을 나타내는 엘리먼트에 고유한 key 속성을 추가합니다. */}
          <div 
          className="m-2">
            <Row>
                <Col sm={2}>
                    <div 
                    className={styles.left}>
                            <img 
                            className={styles.profile_img}
                            src="..\public\icons\totoro2.jpg" alt="profile_img" />
                    </div>
                </Col>
                <Col>
                    <div 
                    className={styles.middle}>
                        <div
                        className={styles.nickname}>
                            {nickname}
                        </div>
                        <div
                        className={styles.content}>
                          <div>
                              {data.title}
                          </div>
                          <div>
                              {data.content}
                          </div>
                        </div>
                    </div>
                </Col>
            </Row>
            </div>
        </div>
      ))}
    </div>
  );
}

export default Announcement;
