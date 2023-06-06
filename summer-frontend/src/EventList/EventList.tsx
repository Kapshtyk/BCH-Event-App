import React, { useContext } from 'react'
import Event, { Name } from '../models/Event'
import Working from './Working'

interface Props {
  events: Event[]
  isWorking: boolean
  onClick: React.MouseEventHandler<HTMLLIElement>
}

export default function EventList(props: Props) {
  const getFinnishEventNameSpan = (event: Event) => {
    if (!event.name) {
      return <span>Tapahtuma</span>
    }

    return <span>{event.name.fi}</span>
  }

  const getEventNameSpan = (event: Event) => {
    if (!event.name) {
      return <span>Event</span>
    }

    if (!event.name.en) {
      return getFinnishEventNameSpan(event)
    }

    if (event.name.en.length === 0) {
      return getFinnishEventNameSpan(event)
    }

    return <span>{event.name.en}</span>
  }

  return (
    <ul id="event-list">
      {props.isWorking ? (
        <Working></Working>
      ) : props.events.length > 0 ? (
        props.events.map((event, index) => {
          return (
            <li key={index} data-index={index} onClick={props.onClick}>
              {event.end_time ? (
                <span>
                  {new Date(event.start_time).toLocaleDateString()} -{' '}
                  {new Date(event.end_time).toLocaleDateString()}
                </span>
              ) : (
                <span>{new Date(event.start_time).toLocaleDateString()}</span>
              )}

              {getEventNameSpan(event)}

              {event.images![0] ? <img src={event.images![0].url}></img> : null}
            </li>
          )
        })
      ) : (
        <li style={{ justifyContent: 'center' }}>{'No events.'}</li>
      )}
    </ul>
  )
}
