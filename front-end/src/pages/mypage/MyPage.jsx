// import { useState } from 'react';
import './MyPage.css';
import MypageTabbox from "../../components/mypagetapbox/MyPageTabBox"

function MyPage() {

  return (
    <div className='mypage-container'>
      {/* Mypage Banner */}
      <div className='mypage-banner'>
        <img className='mypage-banner-img' src="../public/icons/travel.jpg" alt="" />
      </div>

      {/* User Info Section */}
      <div className='user-info'>
        <div className="mypage-user-left">
          <img className="mypage-user-img" src="../public/icons/totoro2.jpg" alt="" />
        </div>

        <div className='mypage-user-center'>
          <div className="mypage-user-text">
            <h1></h1>
            <h3></h3>
            <div className='mypage-user-box'>
              <p>집에 가고 싶어요. 집에 가고 싶어요.
                 집에 가고 싶어요</p>
            </div>
          </div>
        </div>

        <div className='mypage-user-right'>
          <button>구독</button>
        </div>
      </div>
      <MypageTabbox />
    </div>
  );
}

export default MyPage;
