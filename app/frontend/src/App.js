import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import LandingPage from './components/LandingPage';
import SignUp from './components/sessionPage/signUp';
import Session from "./components/sessionPage/session";
import Profile from "./components/ProfilePage/profifle";
import Top from "./components/topPage/top";
import './assets/css/App.css';
import './assets/css/reset.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/top" element={<Top />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Session />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;