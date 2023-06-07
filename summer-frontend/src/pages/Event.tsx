import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { format, parseISO } from 'date-fns'
import classes from './Event.module.css'
import imagine from '../media/images/events.jpg'
import { CurrentUserContext, PollsQuestionContext } from '../context/context'
import {
  cancelRegistrationToEvent,
  checkEventRegistration,
  getEventById,
  registerToEvent,
  postComment,
  updateComment,
  deleteComment
} from '../api/EventsAPI'
import { EventType, CommentType } from '../types/events'
import Poll from '../components/Poll'
import ImageComponent from './ImageComponent'
// import { getEvents } from '../api/EventsAPI';

const Event: React.FC = () => {
  const [singleEvent, setEvent] = useState<EventType | null>(null)
  const [commentText, setCommentText] = useState('')
  const { event } = useParams<{ event: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const currentUser = useContext(CurrentUserContext).currentUser
  const pollsQuestion = useContext(PollsQuestionContext).pollsQuestion

  useEffect(() => {
    setIsLoading(true)
    const fetchSingleEvent = async () => {
      try {
        if (event) {
          const response = await getEventById(event)
          if (!('message' in response)) {
            const data: EventType = response
            console.log(response.baseImage)
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

  const createComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (currentUser && event && commentText.length > 5) {
        const response = await postComment(currentUser.user, event, commentText)
        if ('message' in response) {
          console.error(response.message)
          return
        }
        setEvent((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              comments: prevState.comments
                ? [...prevState.comments, response]
                : [response]
            }
          }
          return null
        })
        setCommentText('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const removeComment = async (commentId: number) => {
    try {
      await deleteComment(commentId)
      setEvent((prevState) => {
        if (prevState) {
          const updatedComments = (prevState.comments || []).filter(
            (comment) => comment.id !== commentId
          )
          return {
            ...prevState,
            comments: updatedComments
          }
        }
        return prevState
      })
    } catch (error) {
      console.log(error)
    }
  }
  const editComment = async (commentId: number, newText: string) => {
    try {
      const response = await updateComment(commentId, newText)
      if ('message' in response) {
        console.error(response.message)
        return
      }
      setEvent((prevState) => {
        if (prevState) {
          const updatedComments = (prevState.comments || []).map((comment) =>
            comment.id === commentId
              ? { ...comment, text: response.text }
              : comment
          )
          return {
            ...prevState,
            comments: updatedComments
          }
        }
        return null
      })
    } catch (error) {
      console.log(error)
    }
  }

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
  //google navigation
  const openGoogleMapsDirections = (location: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      location
    )}`
    window.open(url, '_blank')
  }
  return (
    <div className={classes.event}>
      {singleEvent.baseImage && (
        <ImageComponent base64Image={singleEvent.baseImage} />
      )}
      {!singleEvent.baseImage && <img src={imagine} alt="event" />}
      <h3>Event title : {singleEvent.title}</h3>
      <p>Description: {singleEvent.description}</p>
      <p>
        Date/Time: {format(parseISO(singleEvent.eventDate), 'MMMM d,yyyy')}{' '}
        {format(parseISO(singleEvent.eventDate), 'h:mm a')}
      </p>
      <p>
        Location: {singleEvent.location}{' '}
        <span className={classes.navigation}>
          <button
            onClick={() => openGoogleMapsDirections(singleEvent.location)}
          >
            Direction
          </button>
        </span>
      </p>
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
        <Poll data={pollsQuestion[1]} />
        <h3>Comments</h3>
        {singleEvent.comments?.map((cmnt, i) => (
          <li key={i}>
            <p className={classes.author}>
              Author: <span>{cmnt.author.email}</span>
            </p>
            <p>{cmnt.text}</p>
            {currentUser && event && (
              <div>
                <button onClick={() => removeComment(cmnt.id)}>
                  Delete Comment
                </button>
                <button onClick={() => editComment(cmnt.id, 'Updated Text')}>
                  Edit Comment
                </button>
              </div>
            )}
          </li>
        ))}
      </div>
      <form className={classes.formcontainer} onSubmit={createComment}>
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
