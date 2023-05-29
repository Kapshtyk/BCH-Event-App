import * as React from 'react';
import classes from './LoginForm.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm(props: any) {

    const [data, setData] = useState({})

    const inputHandler = (e: any) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const headie = {
        headers: {
            "Content-Type": "applicaton/json"
        }
    };
    const url = 'http://localhost:8007/api/login'
    const theData = {
        body: {
            data
        }
    }

    const handleSubmit = (e: any) => {

        e.preventDefault()
        axios
            .post(url, data, { headers: { 'Content-Type': 'application/json' } })
            .then(response => console.log(response))
            .catch(e => console.log(e))

    }


    return (
        <form className={classes.loginForm} onSubmit={handleSubmit}>
            <fieldset>
                <legend>Sign in to get extra features</legend>

                {/* <label htmlFor="fname">Name</label>
            <input type="text" id="fname" onChange={props.inputHandler}/> */}
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" onChange={inputHandler} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={inputHandler} />
                <input className="submit-button" type="submit" value="submit" />
                <p>First time here?</p>
                <button className='register'>register</button>
            </fieldset>
        </form>
    )
}

export default LoginForm