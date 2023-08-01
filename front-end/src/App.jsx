// import React, { useState } from 'react'
import Header from './components/header/Header'
import './App.module.css'
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./pages/home/Home";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import Stage from "./pages/stage/Stage";
import Mypage from "./pages/mypage/MyPage";
import Search from "./pages/search/Search";
import Checkpassword from "./pages/checkpassword/CheckPassword"
import NotFound from "./pages/notfound/NotFound";
import Test from "./redux/test";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
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
            <Route path="/*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  )
}

export default App
