// Search.jsx
import styles from './Search.module.css';
import Result from './SearchResult'
import { useParams } from 'react-router-dom';

function Search() {
  const { word } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.contents}>
          <div className={styles.middle}>
            <div className={styles.searchresult}>
              <div className={styles.resultbox}>
                <h1 style={{color:'white'}}>{word} 로 검색한 결과</h1>
                <Result word={word}/>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
