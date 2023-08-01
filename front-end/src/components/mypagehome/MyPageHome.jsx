// 공연기록에서 가장 앞에 있는 포스터를 좌측 상단
// 방명록내용에서 4개를 우측 상단
// 이전 공연기록을 하단에 출력
import data from '../../stage_data.json';
import guest from '../../guest.json';
import StageCard from '../cards/stagecard';
import {Row,Col} from 'react-bootstrap'
import styles from "./MyPageHome.module.css"



function MyPageHome(props) {
    console.log(props)
    var {user_id} = props;
    var stage_list = data.filter((stage) => {
    return user_id === stage.fields.user_id;
    });
    var first_satge = stage_list.slice(0,1)
    // var homeguestbook = guest.slice(0,4)
    console.log(first_satge)
    // console.log(homeguestbook)
  return (
    <div>MyPageHome
        <Row>
            <Col>
            {/* <StageCard
                className={styles.component}
                data={first_stage} />  */}
            </Col>
            <Col>
                {/* {homeguestbook.map((data)=>
                (data.content))} */}
            </Col>
        </Row>
        <Row>

        </Row>
    </div>
  )
}

export default MyPageHome