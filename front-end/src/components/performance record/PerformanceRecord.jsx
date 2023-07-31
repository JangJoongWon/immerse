import data from '../../stage_data.json';
import StageCard from '../cards/stagecard';
import {Row,Col} from 'react-bootstrap'
import styles from "./PerformanceRecord.module.css"

function PerformanceRecord(props) {
  var user_id = props.user_id;
  var stage_list = data.filter((stage) => {
    return user_id === stage.fields.user_id;
  });

  return (
        <div
        className='m-3'>
            <div
            className={styles.container}>
                {stage_list.map((stage) => (
                        <StageCard
                        className={styles.component}
                        key={stage.pk} data={stage} />
                ))}
            </div>
        </div>
  
        )
}

export default PerformanceRecord;
