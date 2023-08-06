import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { Button } from "react-bootstrap";
import MakeStage from "./MakeStageModal";
import CastList from './CastList';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, setCagoryMap } from '../../redux/categorySlice';
import { API_BASE_URL } from '../../constants';

function Home() {

  const [MakeStageOn, setMakeStageOn] = useState(false);

  const dispatch = useDispatch();

  const [LiveStage, setLiveStage] = useState([])
  const [ReserveStage, setReserveStage] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${API_BASE_URL}/shows/popular/progress`);
        console.log('progress axios success', response1);
        setLiveStage(response1.data)
      } catch (error) {
        console.log('progress axios error:', error.message);
      }
  
      try {
        const response2 = await axios.get(`${API_BASE_URL}/shows/popular/reservation`);
        console.log('reservation axios success', response2);
        setReserveStage(response2.data)
      } catch (error) {
        console.log('reservation axios error:', error.message);
      }

      try {
        const categoriesResponse = await axios.get(`${API_BASE_URL}/categories/`);
        console.log(categoriesResponse);
        const categories = categoriesResponse.data;
        const cagoryMap = {};
        for (const e of categories) {
          const { categoryId, categoryName } = e;
          cagoryMap[categoryId] = { 
            categoryName
          };
        }
        console.log(cagoryMap);
        dispatch(setCategories([...categories]));
        dispatch(setCagoryMap(cagoryMap));
      }
      catch (e) {
        console.log(e);
      }
    };
        fetchData();
      }, []);

  return (
    <div className="App">
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.contents}>
          <div className={styles.middle}>
            <div className={styles.banner}>
              <img className={styles.banner} src="../public/icons/totoroposter.jpg" alt="" />
            </div>
            <MakeStage
              show={MakeStageOn}
              onHide={() => setMakeStageOn(false)}
            />
            <Button
              variant="danger"
              onClick={() => setMakeStageOn(true)}
            >
              방만들기
            </Button>

            <CastList Live={LiveStage} Reserve={ReserveStage}/>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
