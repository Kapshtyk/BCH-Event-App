import React, { useContext, useEffect, useState } from 'react'
import classes from './Profile.module.css'
import LoginForm from '../components/LoginForm'
import { CurrentUserContext } from '../context/context'
import { UserEventGet } from '../types/users'
import { getRegisteredEvents } from '../api/EventsAPI'
import { Link } from 'react-router-dom'

const Profile = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const [showLoginOverlay, setShowLoginOverlay] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(true)
  const [events, setEvents] = useState<UserEventGet[]>([])

  useEffect(() => {
    if (currentUser && 'user' in currentUser) {
      setShowLoginButton(false)
      getRegisteredEvents(currentUser.user).then((data) => {
        if (!('message' in data)) {
          setEvents(data)
        }
      })
    }
  }, [currentUser])

  const handleLoginButtonClick = () => {
    setShowLoginOverlay(true)
  }

  // const handleRegisterButtonClick = () => {
  //   setShowRegisterModal(true)
  // }

  const handleOverlayClose = () => {
    setShowLoginOverlay(false)
    setShowRegisterModal(false)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className={classes.profile}>
      <h2>Your Account</h2>
      {showLoginButton && (
      <button onClick={handleLoginButtonClick}>Login</button>)}
      <div>
        {events && events.length > 0 && (
          <>
            <h3>Your events</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  return (
                    <tr key={event.id}>
                      <td>
                        <Link to={`/events/${event.event.id}`}>
                          {event.event.title}
                        </Link>
                      </td>
                      <td>{formatDate(event.event.eventDate)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {showLoginOverlay && (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <LoginForm />
            <button onClick={handleOverlayClose}>Close</button>
          </div>
        </div>
      )}
      {showRegisterModal && (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <h3>Register</h3>
            {/* Register form here */}
            <button onClick={handleOverlayClose}>Close</button>
          </div>
        </div>
      )}

      
    </div>
  )
}

export default Profile
