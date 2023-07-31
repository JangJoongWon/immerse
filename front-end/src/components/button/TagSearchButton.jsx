import { useState } from 'react';
import { Button } from 'react-bootstrap';
import search_histories from '../../search_histrories.json';
import styles from './TagSearchButton.module.css';

function TagSearchButton(props) {
  const { user_id, updateSearchFilters } = props;
  const selected_search_histories = search_histories.data.filter((history) => user_id === history.user_id);

  const [activeTags, setActiveTags] = useState([]);

  // 검색 필터를 업데이트하는 함수
  function customUpdateSearchFilters(tag) {
    updateSearchFilters(tag.query);
  }

  // 태그를 클릭할 때 실행되는 핸들러 함수
  function handleTagClick(tag) {
    if (activeTags.includes(tag)) {
      // 이미 선택된 태그인 경우, activeTags 배열에서 제거
      setActiveTags(activeTags.filter((activeTag) => activeTag !== tag));
    } else {
      // 선택되지 않은 태그인 경우, activeTags 배열에 추가
      setActiveTags([...activeTags, tag]);
    }
    // 검색 필터 업데이트
    customUpdateSearchFilters(tag);
  }

  return (
    <div style={{ border: "2px solid red" }} className={styles.container}>
      <div className={styles.buttonContainer}>
        태그 :
        {selected_search_histories.map((tag) => (
          <Button
            key={tag.search_id}
            className={`${styles.button} ${activeTags.includes(tag) ? styles.active : ''}`}
            style={{ margin: "1rem", border: "2px solid black" }}
            onClick={() => handleTagClick(tag)}
          >
            {tag.query}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TagSearchButton;

