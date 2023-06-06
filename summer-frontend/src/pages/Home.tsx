import React from 'react'
import classes from './Home.module.css'
import EventsPreview from '../components/EventsPreview'

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.herobanner}>
        <h2>HOMEPAGE PICTURE WILL BE ADDED INSTEAD. MAYBE...</h2>
      </div>
      <div className={classes.cardsection}>
        <EventsPreview />
      </div>
      <div></div>
    </div>
  )
}

export default Home
