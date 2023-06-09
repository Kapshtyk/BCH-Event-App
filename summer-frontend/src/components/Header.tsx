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
      {currentUser && (
        <div className={classes.login}>
          <Nav />
          <div className={classes.name}>
            <p>Welcome:</p>
            <h3>{currentUser.email.split('@')[0].toUpperCase()}</h3>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
