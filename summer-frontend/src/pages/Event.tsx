import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { format, parseISO } from 'date-fns'
import classes from './Event.module.css'
import imagine from '../media/images/events.jpg'
import { CurrentUserContext } from '../context/context'
import {
  cancelRegistrationToEvent,
  checkEventRegistration,
  checkEventsPoll,
  getComments,
  getEventById,
  postComment,
  registerToEvent
} from '../api/EventsAPI'
import { EventType, CommentType } from '../types/events'
import Poll from '../components/Poll'
import ImageComponent from './ImageComponent'
import { PollsQuiestion } from '../types/polls'
import Comment from '../components/Comment'

const Event: React.FC = () => {
  const [singleEvent, setEvent] = useState<EventType | null>(null)
  const [commentText, setCommentText] = useState('')
  const { event } = useParams<{ event: string }>()
  const [comments, setComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const currentUser = useContext(CurrentUserContext).currentUser
  const [polls, setPolls] = useState<PollsQuiestion[]>([])

  useEffect(() => {
    if (event) {
      setIsLoading(true)
      getEventById(event).then((data) => {
        if (!('message' in data)) {
          setEvent(data)
          setIsLoading(false)
        }
      })
    }
  }, [event])

  useEffect(() => {
    if (event) {
      getComments(event).then((data) => {
        if (!('message' in data) && data.length > 0) {
          setComments(data)
        }
      })
    }
  }, [event])

  useEffect(() => {
    if (currentUser && event) {
      checkEventRegistration(currentUser.user, event)
        .then((data) => {
          if (!('message' in data) && data.length > 0) {
            setRegistered(true)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  useEffect(() => {
    if (event) {
      checkEventsPoll(event)
        .then((data) => {
          if (data.length > 0) {
            setPolls(data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [event])

  const fetchComments = async (event: string | number | undefined) => {
    if (event) {
      try {
        const data = await getComments(event)
        if (!('message' in data)) {
          setComments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchPollsQuestions = async (event: string | number | undefined) => {
    if (event) {
      try {
        const data = await checkEventsPoll(event)
        if (data.length > 0) {
          setPolls(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const createComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (currentUser && event && commentText.length > 5) {
        const response = await postComment(currentUser.user, event, commentText)
        if ('message' in response) {
          console.error(response.message)
          return
        }
        fetchComments(event)
        setCommentText('')
      }
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
      <h3>{singleEvent.title}</h3>
      <div className={classes.description}>
        <p>{singleEvent.description}</p>
      </div>
      <h3>When and where</h3>
      <div className={classes.date_location}>
        <p>
          <span
            className="material-symbols-outlined"
            style={{ verticalAlign: 'middle' }}
          >
            event
          </span>
          <span className={classes.time}>Date and Time: </span>
        </p>
        <p className={classes.lightfont}>
          {format(parseISO(singleEvent.eventDate), 'MMMM d,yyyy')}{' '}
          {format(parseISO(singleEvent.eventDate), 'h:mm a')}
        </p>

        <p>
          <span
            className="material-symbols-outlined"
            style={{ verticalAlign: 'middle' }}
          >
            location_on
          </span>
          <span className={classes.location}>Location:</span>
        </p>
        <p className={classes.lightfont}>
          {singleEvent.location}
          {''}
          <span className={classes.navigation}>
            <button
              onClick={() => openGoogleMapsDirections(singleEvent.location)}
            >
              <span
                className="material-symbols-outlined"
                style={{ verticalAlign: 'middle', color: '#4A89F3' }}
              >
                near_me
              </span>
            </button>
          </span>
        </p>
      </div>
      {currentUser && registered && (
        <div className={classes.cancelButton}>
          <h3>You are already registered for this event.</h3>
          <button onClick={cancelRegistration}>Cancel registration</button>
        </div>
      )}
      {currentUser && !registered && (
        <div className={classes.register}>
          <h3>Register for the event</h3>
          <button onClick={registration}>Register now</button>
        </div>
      )}
      <div className={classes.comments}>
        {polls && polls.length > 0 && (
          <>
            <h3>{polls.length === 1 ? 'Poll' : 'Polls'}</h3>
            {polls.map((poll) => {
              return (
                <Poll
                  key={poll.id}
                  data={poll}
                  fetch={() => {
                    fetchPollsQuestions(event)
                  }}
                />
              )
            })}
          </>
        )}
      </div>
      <div className={classes.comments}>
        <h3>Comments</h3>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              event={event}
              fetch={() => {
                fetchComments(event)
              }}
            />
          ))}
        <form className={classes.formcontainer} onSubmit={createComment}>
          <textarea
            className={classes.textarea}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button className={classes.submit} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default Event
