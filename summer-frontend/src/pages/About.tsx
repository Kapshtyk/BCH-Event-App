import React, { useState } from 'react';
import classes from './About.module.css';
import Helsinki from '../components/Helsinki';
import College from '../components/College';

const About = () => {
    const [showHelsinki, setShowHelsinki] = useState(false);
    const [showCollege, setShowCollege] = useState(false);

    const handleHelsinkiClick = () => {
        setShowHelsinki(true);
        setShowCollege(false);
    };

    const handleCollegeClick = () => {
        setShowHelsinki(false);
        setShowCollege(true);
    };

    return (
        <div className={classes.about}>
            <p>About section</p>
            <button onClick={handleHelsinkiClick}>Helsinki info</button>
            <button onClick={handleCollegeClick}>College info</button>

            {showHelsinki && <Helsinki />}
            {showCollege && <College />}
        </div>

    );
};

export default About;