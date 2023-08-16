import { useState, useEffect } from 'react'
import styles from './CategoryResult.module.css'
import BroadCast from '../home/BroadCast'
import { API_BASE_URL } from '../../constants';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function CategoryResult({ id }) {

    const [searchShow, setSearchShow] = useState([]);
    const [nowSelected, setNowSelected] = useState(id);

    useEffect(() => {
      const fetchData = async () => {
        // console.log('id:', id)
        try {
          const response = await axios.get(`${API_BASE_URL}/shows/categories/${id}`);
          // console.log('show:', response)
          setSearchShow(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchData();
    }, [id]); // id가 변경될 때마다 API 요청을 다시 보냄


    const categories = useSelector(state => state.category.categories);
    const categoryMap = useSelector(state => state.category.categoryMap);
    const navigate = useNavigate();

    const toCategory = (id) => {
      setNowSelected(id)
      navigate(`/category/${id}`)
    }
  
  return (
    <div className={styles.container}>

        <div className={styles.categoryTags}>
          <ul className={styles.categoryZip}>
          {categories.map((item) => (
            <div key={item.categoryId}>
              {item.categoryId === nowSelected ? (
                <a
                  href="/"
                  className={styles.selected}
                  onClick={(event) => {
                    event.preventDefault();
                    toCategory(item.categoryId);
                  }}>
                  {item.categoryName}
                </a>
              ) : (
                <a
                href="/"
                // style={{ color: item.categoryId === nowSelected ? '#8b00ff' : 'white' }}
                className={styles.notSelected}
                onClick={(event) => {
                  event.preventDefault();
                  toCategory(item.categoryId);
                }}>
                {item.categoryName}
              </a>

              )}
            </div>
          ))}
          </ul>
        </div>

        <div className={styles.listResult}>

          <h1 style={{color: 'White'}}>{categoryMap[id].categoryName}</h1>
          <div className={`${styles.popularList} ${styles.gridMove}`}>
            {searchShow.map((item) => (
              <BroadCast key={item.showId} data={item} className={styles.card}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default CategoryResult