// import React from 'react'
import styles from './Category.module.css'
import { useParams } from 'react-router-dom';
import Result from './CategoryResult'
import { useSelector } from 'react-redux';

function Category() {
  
  const { id } = useParams();

  const categoryMap = useSelector(state => state.category.categoryMap);

  const consoleLog = () => {
    console.log(id)
  }

  return (
    <div className={styles.container}>
    <div className={styles.body}>
      <div className={styles.contents}>
        <div className={styles.middle}>
          <div className={styles.searchresult}>
            <div className={styles.resultbox}>
              <h2 onClick={consoleLog}>{categoryMap[id].categoryName} 로 검색한 결과</h2>
              <Result id={id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Category