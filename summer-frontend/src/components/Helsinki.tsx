import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Helsinki.module.css'
import Event from '../models/Event'

const Helsinki = () => {
  const [data, setData] = useState<Event[]>([]);
  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://api.hel.fi/linkedevents/v1/event/', {
      })

      .then((response) => {
        //sort filtering
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(data)
  const getFinnishEventNameSpan = (event: Event) => {
    if (!event.name) {
      return <span>Event</span>
    }

    return <span>{event.name.fi}</span>
  }

  return <span>{event.name.fi}</span>
}

const getEventNameSpan = (event: Event) => {
  if (!event.name) {
    return <span>Event</span>
  }

  // const getFinnishDescription = (event: Event): JSX.Element => {
  //     if (event.description?.fi) {
  //         if (event.description.fi.length > 0) {
  //             return <div className="event-description" dangerouslySetInnerHTML={{ __html: event.description.fi }}></div>
  //         }
  //     }

  //     if (event.short_description?.fi) {
  //         if (event.short_description.fi.length > 0) {
  //             return <div className="event-description" dangerouslySetInnerHTML={{ __html: event.short_description.fi }}></div>
  //         }
  //     }

  //     return <div className="event-description"></div>
  // }

  // const getEnglishDescription = (event: Event): JSX.Element => {
  //     if (event.description?.en) {
  //         if (event.description.en.length > 0) {
  //             return <div className="event-description" dangerouslySetInnerHTML={{ __html: event.description.en }}></div>
  //         }
  //     }

  //     if (event.short_description?.en) {
  //         if (event.short_description.en.length > 0) {
  //             return <div className="event-description" dangerouslySetInnerHTML={{ __html: event.short_description.en }}></div>
  //         }
  //     }

  //     return getFinnishDescription(event);
  // }

  // const getDescription = (event: Event) => {

  //     return getEnglishDescription(event);
  // }

  if (event.short_description?.fi) {
    if (event.short_description.fi.length > 0) {
      return (
        <div
          className="event-description"
          dangerouslySetInnerHTML={{ __html: event.short_description.fi }}
        ></div>
      )
    }
  }

  return (
    <div className={classes.helsinki}>
      {data.length ? (
        <ul>
          {data.map((event) => (
            <li key={event.id}>
              {event.images![0] ? <img src={event.images![0].url}></img> : null}
              {event.end_time
                ? <span>{new Date(event.start_time).toLocaleDateString()} - {new Date(event.end_time).toLocaleDateString()}</span>
                : <span>{new Date(event.start_time).toLocaleDateString()}</span>}
              {getEventNameSpan(event)}

              {/* {getDescription(event)} */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

  return getFinnishDescription(event)
}

const getDescription = (event: Event) => {
  return getEnglishDescription(event)
}

return (
  <div className={classes.helsinki}>
    {data.length ? (
      <ul>
        {data.map((event) => (
          <li key={event.id}>
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
            {/* {getDescription(event)} */}
          </li>
        ))}
      </ul>
    ) : (
      <p>Loading...</p>
    )}
  </div>
)
}

export default Helsinki
