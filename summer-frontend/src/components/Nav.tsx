import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 650)
    }

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          {isMobile ? (
            <NavLink to="/">Home</NavLink>
          ) : (
            <NavLink to="/">
              <FontAwesomeIcon icon={faHouse} />
              <small>HOME</small>
            </NavLink>
          )}
        </li>
        <li>
          {isMobile ? (
            <NavLink to="/college">College</NavLink>
          ) : (
            <NavLink to="/college">
              <FontAwesomeIcon icon={faSchool} />
            </NavLink>
          )}
        </li>
        <li>
          {isMobile ? (
            <NavLink to="/helsinki">Helsinki</NavLink>
          ) : (
            <NavLink to="/helsinki">
              <FontAwesomeIcon icon={faMap} />
            </NavLink>
          )}
        </li>
        <li>
          {isMobile ? (
            <NavLink to="/faq">FAQ</NavLink>
          ) : (
            <NavLink to="/faq">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </NavLink>
          )}
        </li>
        <li>
          {isMobile ? (
            <NavLink to="/profile">Profile</NavLink>
          ) : (
            <NavLink to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Nav
