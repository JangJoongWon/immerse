import MyPageCard from '../mypagecard/MyPageCard';
import styles from "./PerformanceRecord.module.css"
import {useState, useEffect} from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../constants/index'
import { useSelector } from 'react-redux';
function PerformanceRecord() {


  const userToken = useSelector((state)=>state.user.token)
  const user = useSelector((state)=>state.user.user)
  const [list,setList] = useState([])
  
  useEffect(() => {
    // Axios를 사용하여 데이터를 불러옴
      axios.get(API_BASE_URL + '/shows/', {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + userToken
                },
            })
      .then(response => {
        const tmp = response.data.filter((show) => show.user_id == user.userId )
        setList(tmp); // 불러온 데이터를 상태(State)에 저장
        console.log(response.data)
        console.log(tmp)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[]);
  return (
        <div
        className={styles.container}
        >
            <div
            className={styles.box}
            style={{margin:'1rem'}}>
                {list.map((show) => (
                      <MyPageCard
                      className={styles.component}
                      key={show.title} show={show} />
                  ))}
            </div>
        </div>
  
        )
}

export default PerformanceRecord;
