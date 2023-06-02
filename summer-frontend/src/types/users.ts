export type UserType =
  | {
      user: number
      token: string
      roles: string[]
    }
  | { message: string }

export type UsersType = UserType[]

export type CurrentUserType = UserType | null

export type UserEventGet = {
id:    number;
user:  string;
event: Event;
}

export type UserEventPost = {
  user:  string;
  event: string;
  }

export type Event = {
id:        number;
title:     string;
eventDate: Date;
}
