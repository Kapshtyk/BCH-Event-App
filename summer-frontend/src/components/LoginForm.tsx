import * as React from 'react'
import classes from './LoginForm.module.css'
import { useState, useContext } from 'react'
import { signin } from '../api/EventsAPI'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../context/context'

function LoginForm(props: any) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState({ error: '' })
  const setCurrentUser = useContext(CurrentUserContext).setCurrentUser
  const navigate = useNavigate()

  const inputHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const data = await signin(formData.email, formData.password)
      if ('token' in data) {
        //setCurrentUser(data)
        localStorage.setItem('token', data.token)
        navigate('/')
      } else {
        setError({ error: data.message })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Sign in to get extra features</legend>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" onChange={inputHandler} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={inputHandler} />
        <input className="submit-button" type="submit" value="submit" />
        <p>First time here?</p>
        <button className="register">register</button>
      </fieldset>
      {error && error.error}
    </form>
  )
}

export default LoginForm
