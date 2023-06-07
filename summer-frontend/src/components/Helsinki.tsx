import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Helsinki.module.css'
import Event from '../models/Event'

const Helsinki = () => {
  const [data, setData] = useState<Event[]>([])
  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://api.hel.fi/linkedevents/v1/event/?format=json&page=1&sort=-start_time&keyword_OR=yso:p11185,yso:p1808,yso:p5121,yso:p2625,yso:p965&division=kamppi,pasila&start=today&end=today', {
        // params: {
        //     sort: 'start_time',
        // },
      })

      .then((response) => {
        //sort filtering
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
    return <span>{event.name.en}</span>
  }

  return (
    <div className={classes.helsinki}>
      {data.length ? (
        <ul>
          {data.map((event) => (
            <li key={event.id}>
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
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Helsinki
