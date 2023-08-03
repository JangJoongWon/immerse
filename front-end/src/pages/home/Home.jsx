import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { Button } from "react-bootstrap";
import MakeStage from "./MakeStageModal";
import CastList from './CastList';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Dispatch } from 'react-redux'

function Home() {

  const [MakeStageOn, setMakeStageOn] = useState(false);
  const API_URL = 'https://i9d203.p.ssafy.io/api'

  const dispatch = Dispatch()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${API_URL}/shows/popular/progress`);
        console.log('progress axios success', response1);
      } catch (error) {
        console.log('progress axios error:', error.message);
      }
  
      try {
        const response2 = await axios.get(`${API_URL}/shows/popular/reservation`);
        console.log('reservation axios success', response2);
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

            <CastList />

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
