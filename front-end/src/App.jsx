// import React, { useState } from 'react'
import Header from './components/header/Header'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./pages/home/Home";
import Stage from "./pages/stage/Stage";
import Mypage from "./pages/mypage/MyPage";
import Search from "./pages/search/Search";
import Checkpassword from "./pages/checkpassword/CheckPassword"
import NotFound from "./pages/notfound/NotFound";
import Test from "./redux/test";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <div>
        <Header />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/stage" element={<Stage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkpassword" element={<Checkpassword />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
