import { useState } from 'react';
import './stagecard.css'


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
        className='stage-card-component'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/original/${data.fields.poster_path}`}
          alt="None"
        />
        {hovered && (
          <div className="hover-content">
            <h3>{data.fields.title}</h3>
            <button>버튼</button>
          </div>
        )}
      </div>
    );
  }
  
  export default StageCard;

