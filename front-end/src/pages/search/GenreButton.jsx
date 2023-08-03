// GenreButton.jsx
import React from 'react';
import {Button} from 'react-bootstrap'
import styles from './GenreButton.module.css';

function GenreButton({ data, genreSelected, handleGenreClick }) {
  return (
    <div onClick={handleGenreClick} className={`${styles.genreButton} ${genreSelected ? styles.selected : ''}`}>
        <Button>{data}</Button>
      {/* <h1 style={{ color: 'white' }}>{data}</h1> */}
    </div>
  );
}

export default GenreButton;
