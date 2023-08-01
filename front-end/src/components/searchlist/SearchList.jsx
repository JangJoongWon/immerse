import { useState, useRef, useCallback, useEffect } from 'react';
import styles from "./SearchList.module.css";
import StageCard from "../cards/stagecard"
import ChannelCard from "../cards/ChannelCard"
import { Button } from "react-bootstrap";
import data from '../../stage_data.json';

function SearchList() {
  const listRef = useRef(null); // 리스트 컨테이너를 참조할 useRef

  // 상태관리
  const [listType, setListType] = useState('performance'); // 공연 or 프로필
  const [page, setPage] = useState(1); // 현재 페이지
  const [dataList, setDataList] = useState(data); // 보여줄 데이터 리스트

  // 공연 or 프로필 버튼 클릭 이벤트 핸들러
  const handleListTypeClick = (type) => {
    if (type !== listType) {
      setListType(type);
      setPage(1);
      setDataList(data); // 타입 변경 시 데이터 초기화
    }
  };

  // 인피니티 스크롤 로딩 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // 데이터 추가 로딩 처리
      setPage((prevPage) => prevPage + 1);
      // 실제로는 서버에서 추가 데이터를 가져오는 API 호출을 여기에 구현해야 합니다.
      // 새로운 데이터를 가져온 후, 기존의 데이터와 합쳐서 setDataList로 업데이트해야 합니다.
    }
  }, []);

  // 인피니티 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.container}>
      <div className={styles.boxcover}>
        <div className={styles.box}>
          <div className="bar">
            <h1>예시 검색 결과</h1>
            <div className="list-type-buttons">
              {/* 공연 버튼 */}
              <Button
                onClick={() => handleListTypeClick('performance')}
                variant={listType === 'performance' ? "primary" : "outline-primary"}
                className={styles.listTypeButton}
              >
                공연
              </Button>
              {/* 프로필 버튼 */}
              <Button
                onClick={() => handleListTypeClick('profile')}
                variant={listType === 'profile' ? "primary" : "outline-primary"}
                className={styles.listTypeButton}
              >
                프로필
              </Button>
            </div>
          </div>
          <div className={styles.totalbox} ref={listRef}>
            <div className={styles.stagelist}>
              {/* 인피니티 스크롤로 데이터를 보여줍니다. */}
              <div className={styles.cardRow}>
                {dataList.map((item) => (
                  <div className={styles.cardItem} key={item.pk}>
                    {listType === 'performance' ? (
                      <StageCard key={item.pk} data={item} />
                    ) : (
                      <ChannelCard key={item.pk} data={item} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchList;
