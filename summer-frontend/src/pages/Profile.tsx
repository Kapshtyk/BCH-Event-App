import React, { useContext, useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { CurrentUserContext } from '../context/context'
import { UserEventGet } from '../types/users'
import { getRegisteredEvents } from '../api/EventsAPI'
import { Link } from 'react-router-dom'

const Profile = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const [events, setEvents] = useState<UserEventGet[]>([])

  useEffect(() => {
    if (currentUser && 'user' in currentUser) {
      getRegisteredEvents(currentUser.user).then((data) => {
        if (!('message' in data)) {
          setEvents(data)
        }
      })
    }
  }, [currentUser])

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
    <div className={classes.profileContainer}>
      <div className={classes.profile}>
        <div className={classes.profileElements}>
      <h2>Your Account</h2>
      <p>
      Your email: {currentUser && 'user' in currentUser && currentUser.email}
      </p>
      <div>
        <h3>Your events</h3>
        {events && events.length > 0 && (
          <>
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
                        <Link to={`/events/${event.event.id}`} className={classes.eventLink}>
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
        {(!events || events.length === 0) && (
          <p>You have not registered for any events yet!</p>
        )}
      </div>
      </div>
      </div>
    </div>
  )
}

export default Profile
