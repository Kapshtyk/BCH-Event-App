import React, { useContext } from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import BCC from '../media/images/BC.jpg'
import { isButtonElement } from 'react-router-dom/dist/dom'
import { CurrentUserContext } from '../context/context'

const Header = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <header className={classes.header}>
      <Link to="/" onClick={handleClick}>
        <img className={classes.logo} src={BCC} alt="#" />
      </Link>
      <Nav />
      {currentUser && <button className={classes.logoutButton}><span className="material-symbols-outlined" style={{color: '#b23b3b',fontWeight:'bold'}}>
logout
</span></button>}
    </header>
  )
}

export default Header
