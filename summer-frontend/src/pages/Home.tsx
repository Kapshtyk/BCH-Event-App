import React from 'react'
import classes from './Home.module.css'
import EventsPreview from '../components/EventsPreview'

const Home = () => {
  return (
    <div className={classes.home}>
      <div className="Herobanner">
        <h2>Helsinki Business College</h2>
        <h3>Super mega events are here!</h3>
      </div>
      <div className="CardSection">
        <EventsPreview />
      </div>
      <div></div>
    </div>
  )
}

export default Home
