import { useState, useEffect } from 'react'
import styles from './CategoryResult.module.css'
import BroadCast from '../home/BroadCast'
import { API_BASE_URL } from '../../constants';
import axios from 'axios';

function CategoryResult({id}) {

    const [searchShow, setSearchShow] = useState([]);
    const [showCount, setShowCount] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        console.log('id:', id)
        try {
          const response = await axios.get(`${API_BASE_URL}/shows/categories/${id}`);
          console.log('show:', response)
          setSearchShow(response.data);
          setShowCount(response.data.length);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchData();
    }, [id]); // id가 변경될 때마다 API 요청을 다시 보냄

  return (
    <div className={styles.container}>

        <div className={styles.result}>
            <h3>{showCount}개의 공연</h3>

          <div className={`${styles.categories} ${styles.gridItem}`}>
            {searchShow.map((item) => (
            <BroadCast key={item.showId} data={item} className={styles.card} />
            ))}
          </div>
        </div>



    </div>
  )
}

export default CategoryResult