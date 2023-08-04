// Search.jsx
import styles from './Search.module.css';
import GenreButton from './GenreButton';
import React, { useState } from 'react';
import Result from './SearchResult'

function Search() {
  const genres = ['버스킹', '마술', '스탠딩코미디', '샌드아트', '차력'];
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.contents}>
          <div className={styles.middle}>
            <div className={styles.tags}>
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
                      data={genre}
                      key={genre}
                      genreSelected={selectedGenres.includes(genre)}
                      handleGenreClick={() => handleGenreClick(genre)}
                    />
                  ))}
                </div>
                
              </div>
            </div>
            <div className={styles.searchresult}>
              <div className={styles.resultbox}>
                <h2>search result</h2>
                <Result />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
