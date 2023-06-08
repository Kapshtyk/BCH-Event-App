import { AuthorizationType, AuthorizationUserDataType } from '../types/users'

import cl from './Authorization.module.css'
import style from './Form.module.css'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../context/context'
import { getUserData, signin, signup } from '../api/EventsAPI'

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
    <div className={style.container} style={{ width: 400 }}>
      <h2 className={cl.authorization_title}>
        {hasAccount ? 'Login' : 'Sign up'}
      </h2>
      <form className={cl.authorization_form} onSubmit={handleSubmit}>
        <label className={cl.authorization_lable} htmlFor="email">
          Email:
        </label>
        <input
          className={cl.authorization_input}
          type="email"
          name="email"
          onChange={onChangeInput}
          required
        />
        <label className={cl.authorization_lable} htmlFor="password">
          Password:
        </label>
        <input
          className={cl.authorization_input}
          type="password"
          name="password"
          onChange={onChangeInput}
          required
        />
        <button className={cl.authorization_submit}>Sign up</button>
      </form>
      {error && <span className={cl.authorization_error}>{error}</span>}
      {hasAccount && (
        <div className={cl.authorization_signup}>
          If you do not have an account! <br />
          You can{' '}
          <Link className={cl.authorization_signup_link} to="/signup">
            sign up here
          </Link>
        </div>
      )}
    </div>
  )
}

export default Authorization
