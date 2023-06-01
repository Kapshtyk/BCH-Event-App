import { createContext } from 'react'
import { CurrentUserType } from '../types/users'
import { PollsQuiestion } from '../types/polls'

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

interface IPollsQuestion {
  readonly pollsQuestion: PollsQuiestion[]
  readonly setPollsQuestion: (pollsQuestion: PollsQuiestion[]) => void
  readonly fetchPollsQuestions: () => void
}

export const PollsQuestionContext = createContext<IPollsQuestion>({
  pollsQuestion: [],
  setPollsQuestion: () => null,
  fetchPollsQuestions: () => null
})
