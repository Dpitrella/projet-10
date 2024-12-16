
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Signin from './pages/signin/signin.jsx'
import User from './pages/users/user.jsx'
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user' element={<User />} />
      </Routes>

    </div>
  );
}

export default App;
