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
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    {isMobile ? (
                        <NavLink to="/" onClick={handleClick}>Home</NavLink>
                    ) : (
                        <NavLink to="/" onClick={handleClick}>
                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faHouse} />
                                <small>HOME</small>
                            </div>
                        </NavLink>
                    )}
                </li>
                <li>
                    {isMobile ? (
                        <NavLink to="/polls" onClick={handleClick}>Votes</NavLink>
                    ) : (
                        <NavLink to="/polls" onClick={handleClick}>
                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faSchool} />
                                <small>VOTES</small>
                            </div>
                        </NavLink>
                    )}
                </li>
                <li>
                    {isMobile ? (
                        <NavLink to="/helsinki" onClick={handleClick}>Helsinki</NavLink>
                    ) : (
                        <NavLink to="/helsinki" onClick={handleClick}>
                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faMap} />
                                <small>HELSINKI</small>
                            </div>
                        </NavLink>
                    )}
                </li>
                <li>
                    {isMobile ? (
                        <NavLink to="/faq" onClick={handleClick}>FAQ</NavLink>
                    ) : (
                        <NavLink to="/faq" onClick={handleClick}>
                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faCircleQuestion} />
                                <small>FAQ</small>
                            </div>
                        </NavLink>
                    )}
                </li>
                <li>
                    {isMobile ? (
                        <NavLink to="/profile" onClick={handleClick}>Profile</NavLink>
                    ) : (
                        <NavLink to="/profile" onClick={handleClick}>
                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faUser} />
                                <small>PROFILE</small>
                            </div>
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav
