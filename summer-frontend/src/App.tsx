import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Faq from './pages/Faq'
import Event from './pages/Event'
import Profile from './pages/Profile'
import Layout from './pages/Layout'
import LoginForm from './components/LoginForm'
import Helsinki from './components/Helsinki'
import College from './components/College'
import { CurrentUserContext } from './context/context'
import { CurrentUserType } from './types/users'
import SocketComponent from './components/SocketComponent'

const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, logout }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="faq" element={<Faq />} />
            <Route path="/events/:event" element={<Event />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="helsinki" element={<Helsinki />} />
            <Route path="college" element={<College />} />
            <Route path="socket" element={<SocketComponent />} />
          </Route>
        </Routes>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App
