import React from 'react';
import classes from './Home.module.css';
import Card from '../components/Card';

const Home = () => {
    return (
        <div className={classes.home}>
            <div className='Herobanner'>
                <h2>Upcoming events</h2>
                <input placeholder='EVENT SEARCH' />
            </div>
            <div className='CardSection'>
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Home;