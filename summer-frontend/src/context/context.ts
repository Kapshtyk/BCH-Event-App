import { createContext } from 'react'
import { CurrentUserType } from '../types/users'

interface ICurrentUser {
  readonly currentUser: CurrentUserType
  readonly setCurrentUser: (currentUser: CurrentUserType) => void
  readonly logout: () => void
}

export const CurrentUserContext = createContext<ICurrentUser>({
  currentUser: null,
  setCurrentUser: () => null,
  logout: () => null
})
