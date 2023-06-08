import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { ProtectedRouteType } from '../types/protecredRoute'
import { CurrentUserContext } from '../context/context'

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const location = useLocation()
  const currentUser = useContext(CurrentUserContext).currentUser

  if (!currentUser) {
    localStorage.setItem('redirectPath', JSON.stringify(location))
    return (
      <Navigate
        to={{
          pathname: '/login'
        }}
        replace
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
