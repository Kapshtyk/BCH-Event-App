import React from 'react';
import { Link } from 'react-router-dom';
import imagine from "../media/images/events.jpg"
import classes from './Card.module.css';

const Card = () => {
    return (
        <div className={classes.card}>
            <Link to={`/event`}><img src={imagine} alt="#" /></Link>
            <div className={classes.datearea}>
                <h2>00</h2>
                <p>month</p>
            </div>
            <div className={classes.textarea}>
                <h4>Title</h4>
                <p>Location</p>
            </div>

        </div >
    );
};

export default Card;