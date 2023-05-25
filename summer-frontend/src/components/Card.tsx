import React from 'react';
import { Link } from 'react-router-dom';
import imagine from "../media/images/rock.jpg"
import classes from './Card.module.css';

interface CardProps {
   title?: string

  }
const Card:React.FC<CardProps> = ({title}) => {
   
    
    return (
        <div className={classes.card}>
            <div className={classes.image}>
                <Link to={`/event`}><img src={imagine} alt="#" /></Link>
            </div>
            <div className={classes.texte}>
                <p>Date/Time</p>
                <h4>{title}</h4>
                <p>Location</p>
            </div>

        </div>
    );

};

export default Card;