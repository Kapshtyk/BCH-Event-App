import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/faq">FAQ</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
