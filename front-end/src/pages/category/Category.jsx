// import React from 'react'
import styles from './Category.module.css'
import { useParams } from 'react-router-dom';
import Result from './CategoryResult'

function Category() {
  
  const { id } = useParams();

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