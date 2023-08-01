import { useState } from 'react'
import ChannelCard from '../cards/ChannelCard'
import Announcement from '../announcement/Announcement';
import GuestBook from '../guestbook/GuestBook';
import PerformanceRecord from '../performancerecord/PerformanceRecord';
import ReservationSchedule from '../reservationschedule/ReservationSchedule';

function MyPageTabBox() {
  
  const [selectTab, setSelectTab] = useState('home');

  const changeSelectTab = (tab) => {
    setSelectTab(tab)
  }

  return (
    <div>
        {/* Tab Buttons */}
      <div className='mypage-tap-all'>
        <div className="mypage-tap-button-all">
          <button onClick={() => changeSelectTab('home')}>홈</button>
          <button onClick={() => changeSelectTab('record')}>공연 기록</button>
          <button onClick={() => changeSelectTab('plan')}>공연 일정</button>
          <button onClick={() => changeSelectTab('review')}>방명록</button>
          <button onClick={() => changeSelectTab('sub')}>구독 정보</button>
          <button onClick={() => changeSelectTab('ann')}>공지사항</button>
        </div>

        {/* Tab Content */}
        <div className='mypage-tap-box'>
          {/* Conditional Rendering based on the selected tab */}
          {selectTab === 'home' && (
            <div className='mypage-tap-home'>
              <h1>홈</h1>
            </div>
          )}
          {selectTab === 'record' && (
            <div className='mypage-tap-stage-record'>
              <h1>공연기록</h1>
              <PerformanceRecord user_id={1}/>
            </div>
          )}
          {selectTab === 'plan' && (
            <div className='mypage-tap-stage-plan'>
              <h1>공연일정</h1>
              <ReservationSchedule user_id={1}/>
            </div>
          )}
          {selectTab === 'review' && (
            <div className='mypage-tap-review'>
              <h1>방명록</h1>
              <GuestBook user_id={1} />
            </div>
          )}
          {selectTab === 'sub' && (
            <div className='mypage-tap-subscribe'>
              <h1>구독 정보</h1>
              <ChannelCard />
            </div>
          )}
          {selectTab === 'ann' && (
            <div className='mypage-tap-announcement'>
              <h1>공지사항</h1>
              <Announcement user_id={1} nickname={"집에가고싶은토토로"}/>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default MyPageTabBox