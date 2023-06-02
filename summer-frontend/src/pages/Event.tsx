import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import classes from './Event.module.css'
import imagine from '../media/images/rock.jpg'
import { EventType } from '../types/events'
import { CurrentUserContext } from '../context/context'
import { cancelRegistrationToEvent, checkEventRegistration, registerToEvent } from '../api/EventsAPI'
// import { getEvents } from '../api/EventsAPI';

const Event: React.FC = () => {
  const [singleEvent, setEvent] = useState<EventType | null>(null)
  const { event } = useParams<{ event: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const currentUser = useContext(CurrentUserContext).currentUser

  useEffect(() => {
    setIsLoading(true)
    const fetchSingleEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8007/api/v1/events/${event}`,
          {
            headers: {
              Accept: 'application/json'
            }
          }
        )
        const data: EventType = response.data
        setEvent(data)
        setIsLoading(false)
        console.log(data)
      } catch (error) {
        console.log(error)
        setEvent(null)
      }
    }
    fetchSingleEvent()
  }, [event])

  useEffect(() => {
    if (currentUser && event) {
      checkEventRegistration(currentUser.user, parseInt(event, 10)).then(
        (data) => {
         if (!('message' in data) && data.length > 0) {
          setRegistered(true)
         }
        }  
      )
    }
  }, [])

  const registration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentUser && event) {
      registerToEvent(parseInt(event, 10), currentUser.user).then(data => {
        if ('id' in data) {
          setRegistered(true)
        }
      })
    }
  }

  const cancelRegistration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentUser && event) {
      checkEventRegistration(currentUser.user, parseInt(event, 10)).then(data => {
        if (Array.isArray(data) && data.length > 0) {
          cancelRegistrationToEvent(data[0].id).then(() => setRegistered(false))
        }
      })
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (singleEvent === null) {
    return <p>Event not found</p>
  }
  return (
    <div className={classes.event}>
      <img src={imagine} alt="" />
      <h3>Event title : {singleEvent.title}</h3>
      <p>Description: {singleEvent.description}</p>
      <p>Date/Time: {singleEvent.eventDate}</p>
      <p>Location: {singleEvent.location}</p>
      <div>
        <h3>Comments</h3>
        {singleEvent.comments?.map((cmnt, i) => (
          <li key={i}>
            <p>
              Author: {cmnt.author.firstName} <span>{cmnt.author.email}</span>
            </p>
            <p>{cmnt.text}</p>
          </li>
        ))}
      </div>
      {currentUser && registered && (<div>
        <h2>You are already registered for this event.</h2>
        <button onClick={cancelRegistration}>Cancel registration</button>
      </div>)}
      {currentUser && !registered && (<div>
        <h2>Register for the event</h2>
        <button onClick={registration}>Register now</button>
      </div>)}
    </div>
  )
}

export default Event
