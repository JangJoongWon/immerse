import React, { useState, useEffect } from 'react';
import styles from "./Announcements.module.css"
import anouncements_data from "../../../anouncements_data.json";
import Announcement from "./announcement/Announcement"
import { Button } from "react-bootstrap";

function Announcements(props) {
  const { user_id, nickname } = props;
  const initialVisibleAnnouncements = 10; // 초기에 보여질 공지사항 수
  const announcementsToLoad = 5; // 매번 로드할 공지사항 수

  const [visibleAnnouncements, setVisibleAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 사용자가 스크롤을 아래로 내릴 때 더 많은 공지사항을 로드하는 함수
  const loadMoreAnnouncements = () => {
    setIsLoading(true);
    setTimeout(() => { // API 호출 딜레이를 시뮬레이션하기 위해 setTimeout 사용
      const endIndex = visibleAnnouncements.length + announcementsToLoad;
      const moreAnnouncements = anouncements_data.slice(visibleAnnouncements.length, endIndex);
      setVisibleAnnouncements((prevAnnouncements) => [...prevAnnouncements, ...moreAnnouncements]);
      setIsLoading(false);
    }, 2000); // 원하는 딜레이로 수정 가능
  };

  // 컴포넌트가 마운트될 때 초기 공지사항을 로드하는 useEffect
  useEffect(() => {
    const initialAnnouncements = anouncements_data.slice(0, initialVisibleAnnouncements);
    setVisibleAnnouncements(initialAnnouncements);
  }, []);

  // 스크롤 이벤트 리스너를 추가하여 스크롤을 다루고 더 많은 공지사항을 로드합니다.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleAnnouncements]); // visibleAnnouncements를 의존성 배열에 추가하여 불필요한 이벤트 리스너 호출을 방지합니다.

  const handleScroll = () => {
    const scrolledToBottom =
      window.innerHeight + 2*document.documentElement.scrollTop > document.documentElement.offsetHeight;
    if (scrolledToBottom) {
      loadMoreAnnouncements();
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.createbutton}>
        <Button variant="outline-light">공지사항 만들기</Button>
      </div>
      <div 
      className={styles.content}>
        {visibleAnnouncements.map((data) => (
          <div className={styles.box} key={data.id}>
            <Announcement data={data} nickname={nickname} />
          </div>
        ))}
      </div>
      {isLoading && <div>더 많은 공지사항 로딩 중...</div>}
    </div>
  );
}

export default Announcements;
