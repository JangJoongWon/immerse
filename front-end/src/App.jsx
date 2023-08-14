import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from './redux/userSlice';
import Header from './components/header/Header';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import Home from './pages/home/Home';
import SignIn from './pages/sign/SignIn';
import SignUp from './pages/sign/SignUp';
import Stage from './pages/stage';
import Mypage from './pages/mypage/MyPage';
import Search from './pages/search/Search';
import Category from './pages/category/Category';
import Checkpassword from './pages/checkpassword/CheckPassword';
import NotFound from './pages/notfound/NotFound';
import MyOption from './pages/myoption/MyOption';
import CameraTest from './pages/cameratest/CameraTest';
import StageInfo from './pages/home/StageInfo';

function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUnload = () => {
      // 창을 닫을 때 로그아웃 처리
      dispatch(logOut());
    };
  
    window.addEventListener('unload', handleUnload);
  
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  
  return (
    <Router>
      <div>
        <div className={styles.header}>
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />

          {!token ? (
            <Route path="/login" element={<SignIn />} />
            ):(
            <Route path="/login" element={<Navigate to="/" replace />} />
          )}
          {!token ? (
            <Route path="/signup" element={<SignUp />} />
            ):(
            <Route path="/signup" element={<Navigate to="/" replace />} />
          )}

          {token ? (
            <Route path="/stage/:id" element={<Stage />} />
          ):(
            <Route path="/stage/:id" element={<Navigate to="/login" replace />} />
          )}

          <Route path="/stageinfo/:showId" element={<StageInfo />} />
          
          <Route path="/mypage/:nickname" element={<Mypage />} />
          <Route path="/search/:word" element={<Search />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/checkpassword" element={<Checkpassword />} />
          <Route path="/myoption" element={<MyOption />} />
          <Route path="/cameratest" element={<CameraTest />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
