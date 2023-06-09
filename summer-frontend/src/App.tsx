import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Faq from './pages/Faq'
import Event from './pages/Event'
import Profile from './pages/Profile'
import Layout from './pages/Layout'
import Helsinki from './components/Helsinki'
import { CurrentUserContext } from './context/context'
import { CurrentUserType } from './types/users'
import ProtectedRoute from './components/ProtectedRoute'
import Authorization from './components/Authorization'

const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('roles')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      const storedRoles = localStorage.getItem('roles')
      const storedEmail = localStorage.getItem('email')
      if (storedUser && storedToken && storedRoles && storedEmail) {
        const userData = {
          user: Number(storedUser),
          token: storedToken,
          roles: JSON.parse(storedRoles),
          email: storedEmail
        }
        setCurrentUser(userData)
      }
    }
    checkLocalStorage()
  }, [])

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, logout }}
      >
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="faq" element={<Faq />} />
            <Route
              path="/events/:event"
              element={
                <ProtectedRoute>
                  <Event />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Authorization hasAccount={true} />}
            />
            <Route
              path="/signup"
              element={<Authorization hasAccount={false} />}
            />
            <Route path="helsinki" element={<Helsinki />} />
          </Routes>
        </Layout>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App
