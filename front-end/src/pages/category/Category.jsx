// import React from 'react'
import styles from './Category.module.css'
import { useParams } from 'react-router-dom';
import Result from './CategoryResult'
import { useSelector } from 'react-redux';

function Category() {
  
  const { id } = useParams();

  const categoryMap = useSelector(state => state.category.categoryMap);


  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.middle}>
          <div className={styles.resultbox}>
            <Result id={id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category