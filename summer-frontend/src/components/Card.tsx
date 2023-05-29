import React from 'react';
import { Link } from 'react-router-dom';
import imagine from "../media/images/rock.jpg"
import classes from './Card.module.css';

interface CardsProps {
    title: string
    date: string
    location:string

}

const Card: React.FC<CardsProps> = ({title,date,location}) => {
   
    
    return (
        <div className={classes.card}>
            <div className={classes.image}>
                <Link to={`/event`}><img src={imagine} alt="#" /></Link>
            </div>
            <div className={classes.texte}>
                <p>Date/Time: {date}</p>
                <h4>Title: {title}</h4>
                <p>Location: {location}</p>
            </div>

        </div>
    );

};

export default Card;