import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import Post from './components/Post';
import NewPost from './components/NewPost';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  return (
    
    <BrowserRouter>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
        <Route path="/post/:postId" element={<Post user={user} />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/users/:userId" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
