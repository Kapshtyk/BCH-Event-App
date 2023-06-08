import React, { useContext } from 'react'
import classes from './Home.module.css'
import EventsPreview from '../components/EventsPreview'
import { CurrentUserContext } from '../context/context'

const Home = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  if (currentUser) {
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
  } else {
    return <div>loading...</div>
  }
}

export default Home
