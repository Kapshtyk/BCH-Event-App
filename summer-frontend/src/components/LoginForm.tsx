import * as React from 'react'
import classes from './LoginForm.module.css'
import { useState, useContext } from 'react'
import { getUserData, signin } from '../api/EventsAPI'
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
        localStorage.setItem('token', data.token)
        const userData = await getUserData(data.token)
        if ('roles' in userData) {
          setCurrentUser({
            user: userData.id,
            token: data.token,
            roles: userData.roles
          })
        }
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
        <input className={classes.submitbutton} type="submit" value="SIGN IN" />
        <p>First time here?</p>
        <button className="register">REGISTER</button>
      </fieldset>
      {error && error.error}
    </form>
  )
}

export default LoginForm
