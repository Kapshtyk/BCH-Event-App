import React from 'react';
import classes from './Profile.module.css';


const Profile = () => {
    return (
        <div className={classes.profile}>
            <h3>ACCOUNT</h3>
            <p>First name</p>
            <p>Second name</p>
            <p>Type of account</p>
            <p>Message???</p>
        </div>
    );
};

export default Profile;