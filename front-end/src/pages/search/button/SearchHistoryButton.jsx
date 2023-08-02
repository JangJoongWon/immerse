import { Button } from 'react-bootstrap';
import search_histories from '../../../search_histrories.json';
import styles from './SearchHistoryButton.module.css';

function SearchHistoryButton(props) {
  const { user_id, updateSearchInput } = props;
  const selected_search_histories = search_histories.data.filter((history) => user_id === history.user_id);

  return (
    <div style={{ border: "2px solid red" }} className={styles.container}>
      <div className={styles.buttonContainer}>
        검색기록:
        {selected_search_histories.map((history) => (
          <Button
            key={history.search_id}
            className={styles.button}
            style={{ margin: "1rem", border: "2px solid black" }}
            onClick={() => updateSearchInput(history.query)} // 검색어를 클릭할 때 해당 검색어를 Search 컴포넌트로 전달
          >
            {history.query}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistoryButton;
