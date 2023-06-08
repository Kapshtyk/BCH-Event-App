export type UserType = {
  user: number
  token: string
  roles: string[]
}

export type UserData = {
  id: number
  roles: string[]
}

export type UsersType = UserType[]

export type CurrentUserType = UserType | null

export type UserEventGet = {
  id: number
  user: string
  event: Event
}

export type UserEventPost = {
  user: string
  event: string
}

export type Event = {
  id: number
  title: string
  eventDate: string
}

export type AuthorizationUserDataType = {
  email: string
  password: string
}

export type AuthorizationType = {
  hasAccount: boolean
}
