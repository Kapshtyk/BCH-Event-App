import React, { useContext } from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import { CurrentUserContext } from '../context/context'

const Header = () => {
  const currentUser = useContext(CurrentUserContext).currentUser

  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>EventApp</h1>
      </Link>
      {currentUser && ('user' in currentUser) && <div>{currentUser.roles.join(' ')}</div>}
      <Nav />
    </header>
  )
}

export default Header
