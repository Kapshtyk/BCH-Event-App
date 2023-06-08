import React from 'react'
import { Link } from 'react-router-dom'
import imagine from '../media/images/events.jpg'
import classes from './Card.module.css'
import ImageComponent from '../pages/ImageComponent'

interface CardsProps {
  id: number
  title: string
  date: string
  time: string
  timeDifference: string
  location: string
  description: string
  isPastEvent: boolean
  image?: string | null
}

const Card: React.FC<CardsProps> = ({
  id,
  title,
  date,
  time,
  timeDifference,
  isPastEvent,
  location,
  image
}) => {
  const day = new Date(date).toLocaleDateString(undefined, {
    day: 'numeric'
  })
  const month = new Date(date)
    .toLocaleDateString(undefined, {
      month: 'short'
    })
    .toUpperCase()

  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className={classes.cards}>
        <div className={classes.card}>
            <div className={classes.imgArea}>
      <Link to={`/events/${id}`} onClick={handleClick}>
        {image && <ImageComponent base64Image={image} />}
        {!image && <img src={imagine} alt="event" />}
      </Link>
      </div>
      <div className={classes.textarea}>
        <h3>{title}</h3>  
      </div>
      <div className={classes.datearea}>
        <p>{day}</p>
        <p>{month}</p>
      </div>
      <div className={classes.locationArea}>
      <p>{location}</p>
      </div>
      
      </div>
    </div>
  )
}

export default Card
