import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import classes from './Event.module.css'
import imagine from '../media/images/events.jpg'
import { CurrentUserContext } from '../context/context'
import {
  cancelRegistrationToEvent,
  checkEventRegistration,
  getEventById,
  registerToEvent
} from '../api/EventsAPI'
import { EventType, CommentType } from '../types/events'
// import { getEvents } from '../api/EventsAPI';

const Event: React.FC = () => {
  const [singleEvent, setEvent] = useState<EventType | null>(null)
  const [commentText, setCommentText] = useState('')
  const { event } = useParams<{ event: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const currentUser = useContext(CurrentUserContext).currentUser

  useEffect(() => {
    setIsLoading(true)
    const fetchSingleEvent = async () => {
      try {
        if (event) {
          const response = await getEventById(event)
          if (!('message' in response)) {
            const data: EventType = response
            setEvent(data)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.log(error)
        setEvent(null)
      }
    }
    fetchSingleEvent()
  }, [event])
  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:8007/api/v1/comments`,
        {
          event_id: singleEvent?.id,
          text: commentText
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      const newComment: CommentType = response.data
      setEvent((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            comments: prevState.comments
              ? [...prevState.comments, newComment]
              : [newComment]
          }
        }
        return null
      })
      setCommentText('')
    } catch (error) {
      console.log(error)
    }
  }

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
      registerToEvent(parseInt(event, 10), currentUser.user).then((data) => {
        if ('id' in data) {
          setRegistered(true)
        }
      })
    }
  }

  const cancelRegistration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentUser && event) {
      checkEventRegistration(currentUser.user, parseInt(event, 10)).then(
        (data) => {
          if (Array.isArray(data) && data.length > 0) {
            cancelRegistrationToEvent(data[0].id).then(() =>
              setRegistered(false)
            )
          }
        }
      )
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
      <img src={imagine} alt="event" />
      <h3>Event title : {singleEvent.title}</h3>
      <p>Description: {singleEvent.description}</p>
      <p>
        Date/Time: {format(parseISO(singleEvent.eventDate), 'MMMM d,yyyy')}{' '}
        {format(parseISO(singleEvent.eventDate), 'h:mm a')}
      </p>
      <p>Location: {singleEvent.location}</p>
      {currentUser && registered && (
        <div>
          <h2>You are already registered for this event.</h2>
          <button onClick={cancelRegistration}>Cancel registration</button>
        </div>
      )}
      {currentUser && !registered && (
        <div>
          <h2>Register for the event</h2>
          <button onClick={registration}>Register now</button>
        </div>
      )}
      <div className={classes.comments}>
        <h3>Comments</h3>
        {singleEvent.comments?.map((cmnt, i) => (
          <li key={i}>
            <p className={classes.author}>
              Author: {cmnt.author.firstName} <span>{cmnt.author.email}</span>
            </p>
            <p>{cmnt.text}</p>
          </li>
        ))}
      </div>
      <form className={classes.formcontainer} onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Event
