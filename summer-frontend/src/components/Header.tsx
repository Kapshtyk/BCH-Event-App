<<<<<<< HEAD
import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import BCC from "../media/images/BC.jpg"

const Header = () => {

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <header className={classes.header}>
            <Link to="/" onClick={handleClick}>
                <img className={classes.logo} src={BCC} alt="#" />
            </Link>
            <Nav />
        </header>
    );
};

export default Header
