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
import { CurrentUserContext, PollsQuestionContext } from './context/context'
import { CurrentUserType } from './types/users'
import { getPollsQuestions } from './api/EventsAPI'
import { PollsQuiestion } from './types/polls'
import Poll from './components/Poll'

const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  const [pollsQuestion, setPollsQuestion] = useState<PollsQuiestion[]>([])

  const logout = () => {
    setCurrentUser(null)
  }

  useEffect(() => {
    fetchPollsQuestions()
  }, [])

  const fetchPollsQuestions = async () => {
    getPollsQuestions().then((data) => {
      if (data.length > 0) {
        console.log(data)
        setPollsQuestion(data)
      }
    })
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, logout }}
      >
        <PollsQuestionContext.Provider
          value={{ pollsQuestion, setPollsQuestion, fetchPollsQuestions }}
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
            </Route>
          </Routes>
        </PollsQuestionContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App
