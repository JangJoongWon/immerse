// import React from 'react'; // JSX 문법을 사용하기 위해 React를 임포트합니다.
import styles from "./Announcments.module.css"
import anouncements_data from "../../../anouncements_data.json";
import Announcement from "./announcement/Announcement"
import { Button } from "react-bootstrap";


function Announcements(props) {

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
          <Announcement data={data} nickname={nickname}/>
        </div>
      ))}
      <div
        className={styles.createbutton}>
        <Button>공지사항 만들기</Button>
      </div>
    </div>
  );
}

export default Announcements;
