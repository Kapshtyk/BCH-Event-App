import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Helsinki.module.css'
import Event from '../models/Event'
import { Dna } from 'react-loader-spinner'

const Helsinki = () => {
  const [data, setData] = useState<Event[]>([])
  useEffect(() => {
    axios
      .get(
        'https://api.hel.fi/linkedevents/v1/event/?format=json&page=1&sort=-start_time&keyword_OR=yso:p11185,yso:p1808,yso:p5121,yso:p2625,yso:p965,yso:p19245,yso:p2771&division=kamppi,pasila&start=today&end=today',
        {}
      )
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  console.log(data)

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
    <div className={classes.helsinki}>
      <h2>Helsinki information</h2>
      {data.length ? (
        <ul>
          {data.map((event) => (
            <li key={event.id} className={classes.item}>
              {event.images && event.images[0] ? (
                <img src={event.images[0].url} alt="Event" />
              ) : null}
              {event.end_time ? (
                <span>
                  {new Date(event.start_time).toLocaleDateString()} -{' '}
                  {new Date(event.end_time).toLocaleDateString()}
                </span>
              ) : (
                <span>{new Date(event.start_time).toLocaleDateString()}</span>
              )}
              {getEventNameSpan(event)}
            </li>
          ))}
        </ul>
      ) : (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}
    </div>
  )
}

export default Helsinki
