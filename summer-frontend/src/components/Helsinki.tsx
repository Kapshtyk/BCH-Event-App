import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Helsinki.module.css'
import Event from '../models/Event'

const Helsinki = () => {
  const [data, setData] = useState<Event[]>([])
  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://api.hel.fi/linkedevents/v1/event/', {
        // params: {
        // star_time: today,
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

  return <div>nice</div>
}

export default Helsinki
