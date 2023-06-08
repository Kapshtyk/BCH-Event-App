import React, { useEffect, useState } from 'react'
import classes from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const scrollButtonVisibilityHandler = () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false)
    }
    window.addEventListener('scroll', scrollButtonVisibilityHandler)
    return () => {
      window.removeEventListener('scroll', scrollButtonVisibilityHandler)
    }
  }, [])

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={classes.footer}>
      {showButton && (
        <button className={classes.toTopBtn} onClick={scrollToTopHandler}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
      <small>HBC 2023</small>
    </div>
  )
}

export default Footer
