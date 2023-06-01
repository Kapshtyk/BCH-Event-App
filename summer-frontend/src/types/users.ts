export type UserType =
  | {
      user: number
      token: string
      roles: string[]
    }
  | { message: string }

export type UsersType = UserType[]

export type CurrentUserType = UserType | null
