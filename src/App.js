import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Login from './components/login';
import MyHeader from './common/header';
import Signup from './components/signup';
import NoPage from './components/nopage';
import Dashboard from './components/dashboard';
import AppFooter from './common/footer';
import BlogsPage from './components/blogs';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const addUser = (user) => {
    setUsers([...users, user]);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };
  return (
    <>
      <MyHeader isLoggedIn={isLoggedIn} logout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login users={users} login={handleLogin} />} />
        <Route path="/register" element={<Signup addUser={addUser} />} />
        <Route path="/dashboard" element={<BlogsPage/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <AppFooter />

    </>
  );
}

export default App;
