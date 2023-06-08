import React, { useContext } from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import BCC from '../media/images/BC.jpg'
import { isButtonElement } from 'react-router-dom/dist/dom'
import { CurrentUserContext } from '../context/context'

const Header = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const logout = useContext(CurrentUserContext).logout
  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <header className={classes.header}>
      <Link to="/" onClick={handleClick}>
        <img className={classes.logo} src={BCC} alt="#" />
      </Link>
      <Nav />
      {currentUser && (
        <div className={classes.user}>
          <h2>Hello, {currentUser.email.split('@')[0].toUpperCase()}</h2>
          <button onClick={logout} className={classes.logoutButton}>Logout</button>
        </div>
      )}
    </header>
  )
}

export default Header
