import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { Button } from "react-bootstrap";
import MakeStage from "./MakeStageModal";
import CastList from './CastList';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, setCagoryMap } from '../../redux/categorySlice';
import { setUser } from '../../redux/userSlice';
import { API_BASE_URL } from '../../constants';
import { mainBanner } from '/src/assets/images';

function Home() {

  const dispatch = useDispatch();

  const [MakeStageOn, setMakeStageOn] = useState(false);
  const [LiveStage, setLiveStage] = useState([])
  const [ReserveStage, setReserveStage] = useState([])

  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && !user) {
          const res = await axios.get(`${API_BASE_URL}/user/mypage`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            }
          });
          dispatch(setUser(res.data));
        }
      }
      catch (err) {
        console.log(err);
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

    };
        fetchData();
      }, []);

  return (
    <div className="App">
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.contents}>

          <div className={styles.banner}>
            <div className={styles.bannerimgWrapper}>
              <img
                className={styles.bannerimg}
                src={mainBanner}
                alt=""
              />
              <div className={styles.buttonContainer}>
                <MakeStage
                  show={MakeStageOn}
                  onHide={() => setMakeStageOn(false)}
                />
                <Button
                  className='makeButton'
                  variant="primary"
                  onClick={() => setMakeStageOn(true)}
                >
                  방만들기
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.lists}>
            <div className={styles.middle}>


              <CastList Live={LiveStage} Reserve={ReserveStage}/>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
