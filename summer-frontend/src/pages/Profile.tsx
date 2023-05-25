import React, { useState } from 'react';
import classes from './Profile.module.css';

const Profile = () => {
    const [showLoginOverlay, setShowLoginOverlay] = useState(true);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLoginButtonClick = () => {
        setShowLoginOverlay(true);
    };

    const handleRegisterButtonClick = () => {
        setShowRegisterModal(true);
    };

    const handleOverlayClose = () => {
        setShowLoginOverlay(false);
        setShowRegisterModal(false);
    };

    return (
        <div className={classes.profile}>
            <h3>ACCOUNT</h3>
            <p className={classes.accountField}>First name:</p>
            <p className={classes.accountInfo}>John</p>
            <p className={classes.accountField}>Last name:</p>
            <p className={classes.accountInfo}>Doe</p>
            <p className={classes.accountField}>Email:</p>
            <p className={classes.accountInfo}>john.doe@example.com</p>
            <p className={classes.accountField}>Role:</p>
            <p className={classes.accountInfo}>User</p>
            <p className={classes.accountField}>Comments posted by user:</p>
            <p className={classes.accountInfo}>No comments available</p>

            {showLoginOverlay && (
                <div className={classes.overlay}>
                    <div className={classes.modal}>
                        <h3>Login</h3>
                        {/* Login form here */}
                        <button onClick={handleOverlayClose}>Close</button>
                        <button onClick={handleRegisterButtonClick}>Register</button>
                    </div>
                </div>
            )}

            {showRegisterModal && (
                <div className={classes.overlay}>
                    <div className={classes.modal}>
                        <h3>Register</h3>
                        {/* Register form here */}
                        <button onClick={handleOverlayClose}>Close</button>
                    </div>
                </div>
            )}

            <button onClick={handleLoginButtonClick}>Login</button>
        </div>
    );
};

export default Profile;
