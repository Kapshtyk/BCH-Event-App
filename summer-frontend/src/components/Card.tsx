import React from 'react';
import { Link } from 'react-router-dom';
import imagine from "../media/images/rock.jpg"
import classes from './Card.module.css';

const Card = () => {
    return (
        <div className={classes.card}>
            <div className={classes.imagearea}>
                <Link to={`/event`}><img src={imagine} alt="#" /></Link>
            </div>
            <div className={classes.textarea}>
                <p>Date/Time</p>
                <h4>Title</h4>
                <p>Location</p>
            </div>

        </div>
    );
};

export default Card;