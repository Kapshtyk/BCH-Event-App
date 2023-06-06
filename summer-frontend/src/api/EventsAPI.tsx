import { BASE_URL } from '../service/constant'
import axios, { AxiosResponse } from 'axios'
import { Events, EventType } from '../types/events'
import { UserData, UserEventGet, UserEventPost, UserType } from '../types/users'
import { PollsQuiestion, PollsVote } from '../types/polls'

const token = `${localStorage.getItem('token')}` || ''

async function processRequest<T>(
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
  url: string,
  data?: unknown
): Promise<T> {
  try {
    let headers: any = { Accept: 'application/json' }
    if (localStorage.getItem('token')) {
      headers = { Accept: 'application/json', Authorization: `Bearer ${token}` }
    }
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      headers: headers
    })
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      return response.data
    } else if (response.status === 400) {
      throw new Error('Bad request')
    } else if (response.status >= 500) {
      throw new Error('Server not responding')
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    throw new Error(
      `There is an error with the ${method} request to ${url}: ${error}`
    )
  }
}

const checkArray = (data: unknown) => {
  if (Array.isArray(data)) {
    return data
  } else {
    return []
  }
}

export const getEvents = async (): Promise<Events> => {
  const url = BASE_URL + 'events'
  try {
    const response = await processRequest<Events>('GET', url)
    return checkArray(response)
  } catch (error) {
    console.log(error)
    return []
  }
}

export const signin = async (
  email: string,
  password: string
): Promise<UserType | { message: string }> => {
  //const url = BASE_URL + 'auth'
  const url = 'http://localhost:8007/auth'
  try {
    const response = await processRequest<UserType>('POST', url, {
      email,
      password
    })
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}

export const getUserData = async (
  token: string
): Promise<UserData | { message: string}> => {
  const url = BASE_URL + 'check-token'
  try {
    const response = await processRequest<UserData>('POST', url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}  

export const getPollsQuestions = async (): Promise<PollsQuiestion[]> => {
  const url = BASE_URL + 'polls_questions'
  try {
    const response = await processRequest<PollsQuiestion[]>('GET', url)
    return response
  } catch (error) {
    console.log(error)
    return []
  }
}

export const checkPoll = async (
  question: number,
  author: number
): Promise<PollsVote[]> => {
  const url = BASE_URL + `polls_votes?&question=${question}&author=${author}`
  try {
    const response = await processRequest<PollsVote[]>('GET', url)
    return response
  } catch (error) {
    console.log(error)
    return []
  }
}

export const postVote = async (
  question: number,
  choice: number,
  author: number
): Promise<PollsVote | { message: string }> => {
  const url = BASE_URL + 'polls_votes'
  try {
    const response = await processRequest<PollsVote>('POST', url, {
      question: `api/polls_questions/${question}`,
      choice: `api/polls_choices/${choice}`,
      author: `api/users/${author}`
    })
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}

export const registerToEvent = async (
  event: number,
  user: number
): Promise<UserEventPost | { message: string }> => {
  const url = BASE_URL + 'events_users'
  try {
    const response = await processRequest<UserEventPost>('POST', url, {
      event: `api/events/${event}`,
      user: `api/users/${user}`
    })
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}

export const cancelRegistrationToEvent = async (
  id: number
): Promise<any | { message: string }> => {
  const url = BASE_URL + `events_users/${id}`
  try {
    const response = await processRequest<any>('DELETE', url)
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}

export const getRegisteredEvents = async (
  user: number
): Promise<UserEventGet[] | { message: string }> => {
  const url = BASE_URL + `events_users?user=${user}`
  try {
    const response = await processRequest<UserEventGet[]>('GET', url)
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}

export const checkEventRegistration = async (
  user: number,
  event: number
): Promise<UserEventGet[] | { message: string }> => {
  const url = BASE_URL + `events_users?user=${user}&event=${event}`
  try {
    const response = await processRequest<UserEventGet[]>('GET', url)
    return response
  } catch (error) {
    console.error(error)
    return { message: `Something went wrong: ${error}` }
  }
}

// it hasnot been implemented yet
export const getEventById = async (
  event: string | number
): Promise<EventType | { message: string }> => {
  const url = BASE_URL + `events/${event}`
  try {
    const response = await processRequest<EventType>('GET', url)
    return response
  } catch (error) {
    console.log(error)
    return { message: `Something went wrong: ${error}` }
  }
}
