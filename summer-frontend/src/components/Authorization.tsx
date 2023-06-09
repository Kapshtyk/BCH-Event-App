import { AuthorizationType, AuthorizationUserDataType } from '../types/users'

import cl from './Authorization.module.css'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../context/context'
import { getUserData, signin, signup } from '../api/EventsAPI'
import classes from './LoginForm.module.css'

const Authorization = ({ hasAccount }: AuthorizationType) => {
  const [userData, setUserData] = useState<AuthorizationUserDataType>({
    email: '',
    password: ''
  })
  const setCurrentUser = useContext(CurrentUserContext).setCurrentUser
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (hasAccount) {
      try {
        const data = await signin(userData.email, userData.password)
        if ('token' in data) {
          localStorage.setItem('token', data.token)
          const response = await getUserData(
            localStorage.getItem('token') ?? ''
          )
          if ('roles' in response) {
            localStorage.setItem('user', response.id.toString())
            localStorage.setItem('email', userData.email)
            localStorage.setItem('roles', JSON.stringify(response.roles))
            setCurrentUser({
              user: response.id,
              token: data.token,
              email: userData.email,
              roles: response.roles
            })
            const redirectPath = localStorage.getItem('redirectPath')
            if (redirectPath) {
              localStorage.removeItem('redirectPath')
              navigate(JSON.parse(redirectPath).pathname)
            } else {
              navigate('/')
            }
          }
        } else {
          setError(data.message)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const redirectPath = localStorage.getItem('redirectPath')
        const data = await signup(userData.email, userData.password)
        if ('id' in data) {
          const response = await signin(userData.email, userData.password)
          if ('token' in response) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('email', userData.email)
            localStorage.setItem('user', data.id.toString())
            localStorage.setItem('roles', JSON.stringify(data.roles))
            setCurrentUser({
              user: data.id,
              token: response.token,
              email: userData.email,
              roles: data.roles
            })
            if (redirectPath) {
              localStorage.removeItem('redirectPath')
              navigate(JSON.parse(redirectPath).pathname)
            } else {
              navigate('/')
            }
          }
        } else {
          setError(data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
    <fieldset>
      <legend className={classes.legend}>{hasAccount ? 'Login' : 'Sign up'}</legend>
      <div className={classes.formGroup}>
      <i className="login__icon fas fa-user" style={{position:'absolute',top:'13px',marginLeft:'4px',color:'#be264c'}}></i>
      <input type="email" name="email" onChange={onChangeInput} className={classes.input} placeholder='Email'/>
      </div>
      <div className={classes.formGroup}>
      <i className="login__icon fas fa-lock" style={{position:'absolute',top:'13px',marginLeft:'4px',color:'#be264c'}}></i>
      <input type="password" name="password" onChange={onChangeInput}className={classes.input} placeholder='Password'/>
      </div>
      <div className={classes.button}>
      <input className={classes.submitbutton} type="submit" value={hasAccount ? 'Sign in' : 'Sign up'}/>
      {hasAccount && <p className={classes.registerText}>If you do not have an account you can{' '}
          <Link className={cl.authorization_signup_link} to="/signup">
            sign up here
          </Link></p>}
      </div>
    </fieldset>
    {error && error}
  </form>
)}

export default Authorization
