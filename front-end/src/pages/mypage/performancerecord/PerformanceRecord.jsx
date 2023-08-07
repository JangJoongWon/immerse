import data from '../../../stage_data.json';
import MyPageCard from '../mypagecard/MyPageCard';
// import {Row,Col} from 'react-bootstrap'
import styles from "./PerformanceRecord.module.css"

function PerformanceRecord(props) {
  var {userId} = props
  var stage_list = data.filter((stage) => {
    return userId === stage.fields.user_id;
  });

  return (
        <div
        className={styles.container}
        >
            <div
            className={styles.box}
            style={{margin:'1rem'}}>
                {stage_list.map((stage) => (

                        <MyPageCard
                        className={styles.component}
                        key={stage.id} data={stage} />
                  ))}
            </div>
        </div>
  
        )
}

export default PerformanceRecord;
