import React from 'react';
import { Link } from 'react-router-dom';
import imagine from "../media/images/rock.jpg"
import classes from './Card.module.css';

interface CardsProps {
    id: number
    title: string
    date: string
    time: string
    location:string
    description:string

}

const Card: React.FC<CardsProps> = ({id,title,date,time,location}) => {
   
    
    return (
        <div className={classes.card}>

            <div className={classes.image}>
                <Link to={`${id}`}><img src={imagine} alt="#" /></Link>
            </div>
            <div className={classes.texte}>
                <p>Date/Time: {date} {time}</p>
                <h4>Title: {title}</h4>
                <p>Location: {location}</p>
            </div>

        </div>
    );

};

export default Card;