import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import BCC from "../media/images/BCC.jpg"

const Header = () => {
    return (
        <header className={classes.header}>
            <Link to="/">
                <img className={classes.logo} src={BCC} alt="#" />
            </Link>
            <Nav />
        </header>
    );
};

export default Header
