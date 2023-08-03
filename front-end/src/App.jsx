// import React, { useState } from 'react'
import Header from './components/header/Header'
import styles from './App.module.css'
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./pages/home/Home";
import SignIn from "./pages/sign/SignIn";
// import SignOut from "./pages/sign/SignOut";
import SignUp from "./pages/sign/SignUp";
import Stage from "./pages/stage/Stage";
import Mypage from "./pages/mypage/MyPage";
import Search from "./pages/search/Search";
import Checkpassword from "./pages/checkpassword/CheckPassword"
import NotFound from "./pages/notfound/NotFound";
import Test from "./components/inputpicture/test";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CameraTest from "./pages/cameratest/CameraTest";
import styles from './App.module.css'


function App() {

  return (
      <div>
<<<<<<< HEAD
        <div className={styles.header}>
          <Header/>
        </div>
=======
        <Header className={styles.header}/>
>>>>>>> 2efec69e3333e79fa2a9bdb11385e22964801823
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/stage" element={<Stage />} /> */}
            <Route path="/stage/:id" element={<Stage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkpassword" element={<Checkpassword />} />
            <Route path="/cameratest" element={<CameraTest />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
            

          </Routes>
        </Router>
      </div>
  )
}

export default App
