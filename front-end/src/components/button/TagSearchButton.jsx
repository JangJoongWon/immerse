import { Button } from 'react-bootstrap';
import search_histories from '../../search_histrories.json';
import styles from './TagSearchButton.module.css';

function TagSearchButton(props) {
  const { user_id, updateSearchInput, searchInput } = props;
  const selected_search_histories = search_histories.data.filter((history) => user_id == history.user_id);

  return (
    <div style={{ border: "2px solid red" }} className={styles.container}>
      <div className={styles.buttonContainer}>
        태그 :
        {selected_search_histories.map((tag) => (
          <Button
            key={tag.search_id}
            className={styles.button}
            style={{ margin: "1rem", border: "2px solid black" }}
            onClick={() => updateSearchInput(searchInput+'@'+tag.query)} // 검색어를 클릭할 때 해당 검색어를 Search 컴포넌트로 전달
          >
            {tag.query}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TagSearchButton;
