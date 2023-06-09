import React, { useContext } from 'react'
import classes from './Home.module.css'
import EventsPreview from '../components/EventsPreview'
import { CurrentUserContext } from '../context/context'
import { Dna } from 'react-loader-spinner'

const Home = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  if (currentUser) {
    return (
      <div className={classes.home}>
        <div className={classes.cardsection}>
          <EventsPreview />
        </div>
        <div></div>
      </div>
    )
  } else {
    return <div><Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div>
  }
}

export default Home
