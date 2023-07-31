import { useState, useRef } from 'react';
import styles from './stagecard.module.css';
import { Button } from 'react-bootstrap';
import { Blurhash } from 'react-blurhash';


// import React from 'react'

function StageCard({ data }) {
    const [hovered, setHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
    return (
      <div
        className={styles.component}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width="100%"
          height="100%" />
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/original/${data.fields.poster_path}`}
          alt="None"/>
        {hovered && (
          <div className={styles.content}>
            <h3>{data.fields.title}</h3>
            <div className={styles.button}>
              <Button variant="light">버튼</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default StageCard;

