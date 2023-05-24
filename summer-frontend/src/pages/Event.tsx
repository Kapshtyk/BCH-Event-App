import React from 'react';
import classes from './Event.module.css';
import imagine from "../media/images/rock.jpg"

const Event = () => {
    return (
        <div className={classes.event}>
            <img src={imagine} alt="" />
            <h3>Event title</h3>
            <p>Description</p>
            <p>Date/Time</p>
            <p>Location</p>
        </div>
    );
};

export default Event;