import React from 'react';
import classes from './Home.module.css';
import Card from '../components/Card';

const Home = () => {
    return (
        <div className={classes.home}>
            <div className='Herobanner'>
                <h2>Helsinki Business College</h2>
                <h3>Super mega events are here!</h3>
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