// Search.jsx
import styles from './Search.module.css';
import GenreButton from './GenreButton';
import { useState } from 'react';
import Result from './SearchResult'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Search() {
  // const genres = useSelector((state) => state.category.categories)
  // const [selectedGenres, setSelectedGenres] = useState([]);

  const { word } = useParams();

  // const handleGenreClick = (genre) => {
  //   if (selectedGenres.includes(genre.categoryName)) {
  //     setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre.categoryName));
  //   } else {
  //     setSelectedGenres([...selectedGenres, genre.categoryName]);
  //   }
  // };


  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.contents}>
          <div className={styles.middle}>

            {/* <div className={styles.tags}>
              <div className={styles.selectedTags}>
                <h1>Selected :</h1>
                <div className={styles.selectedGenreButtons}>
                  {selectedGenres.map((genre) => (
                    <GenreButton
                      data={genre}
                      key={genre}
                      genreSelected={true}
                      handleGenreClick={() => handleGenreClick(genre)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.genreTags}>
                <h1>Genre :</h1>
                <div className={styles.selectedGenreButtons}>
                  {genres.map((genre) => (
                    <GenreButton
                      data={genre.categoryName}
                      key={genre.categoryId}
                      genreSelected={selectedGenres.includes(genre)}
                      handleGenreClick={() => handleGenreClick(genre)}
                    />
                  ))}
                </div>
              </div>
            </div> */}

            <div className={styles.searchresult}>
              <div className={styles.resultbox}>
                <h2>"{word}"로 검색한 결과</h2>
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
