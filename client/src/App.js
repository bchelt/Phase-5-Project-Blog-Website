import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import Post from './components/Post';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
