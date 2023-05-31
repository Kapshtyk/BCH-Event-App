import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Faq from './pages/Faq';
import Event from './pages/Event';
import Profile from './pages/Profile';
import Layout from './pages/Layout'
import LoginForm from './components/LoginForm';
import Helsinki from './components/Helsinki';
import College from './components/College';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<Faq />} />
          <Route path="/:event" element={<Event />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="helsinki" element={<Helsinki />} />
          <Route path="college" element={<College />} />

        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App;