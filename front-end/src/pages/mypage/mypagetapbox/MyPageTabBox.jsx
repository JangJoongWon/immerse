import { useState } from 'react'
import SubscribeList from '../subscribelist/SubscribeList';
import PerformanceRecord from '../performancerecord/PerformanceRecord';
import ReservationSchedule from '../reservationschedule/ReservationSchedule';
import MyPageHome from '../mypagehome/MyPageHome';
import styles from './MyPageTabBox.module.css'

function MyPageTabBox(props) {
  // console.log(props)
  const {userId} = props
  
  const [selectTab, setSelectTab] = useState('home');
  const changeSelectTab = (tab) => {
    setSelectTab(tab)
  }

  return (
    <div
    >
        {/* Tab Buttons */}
      <div 
      className='mypage-tap-all'>
        <div 
        style={{textAlign:"center"}}
        className="mypage-tap-button-all">
          <span
            className={`${styles.button} ${selectTab === 'home' ? styles.selectedButton : ''}`}
            onClick={() => changeSelectTab('home')}
          >
            Home
          </span>
          <span 
            className={`${styles.button} ${selectTab === 'record' ? styles.selectedButton : ''}`} 
            onClick={() => changeSelectTab('record')}>
            History
          </span>
          <span 
            className={`${styles.button} ${selectTab === 'plan' ? styles.selectedButton : ''}`} 
            onClick={() => changeSelectTab('plan')}>
            Reservation
          </span>
          <span 
            className={`${styles.button} ${selectTab === 'sub' ? styles.selectedButton : ''}`} 
            onClick={() => changeSelectTab('sub')}>
              Subscribe
          </span>
        </div>

        <div className='mypage-tap-box'
          style={{margin:"0 auto",width:'80%'}}>
          {selectTab === 'home' && (
            <div className='mypage-tap-home'>
              
              <MyPageHome user_id={1}/>

            </div>
          )}
          {selectTab === 'record' && (
            <div className='mypage-tap-stage-record'>
              <PerformanceRecord userId={userId}/>
            </div>
          )}
          {selectTab === 'plan' && (
            <div className='mypage-tap-stage-plan'>
              <ReservationSchedule userId={userId}/>
            </div>
          )}

          {selectTab === 'review' && (
            <div className='mypage-tap-review'>
              {/* <h1>방명록</h1> */}
              {/* <GuestBook user_id={1} /> */}
            </div>
          )}
          {selectTab === 'sub' && (
            <div className='mypage-tap-subscribe'>
              {/* <h1>구독 정보</h1> */}
              <SubscribeList userId={userId}/>
            </div>
          )}
          {selectTab === 'ann' && (
            <div className='mypage-tap-announcement'>
              {/* <h1>공지사항</h1> */}
              {/* <Announcements user_id={1} nickname={"집에가고싶은토토로"}/> */}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default MyPageTabBox