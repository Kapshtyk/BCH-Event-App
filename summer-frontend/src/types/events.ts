export type Events = EventType[]

export type EventType = {
  id: number
  title: string
  description: string
  eventDate: string
  location: string
  comments: CommentType[]
  isPublished: boolean
  createdAt?: string
  baseImage?: string
}

export type CommentType = {
  id: number
  author: AuthorType
  text: string
  publishDate?: string
  isPublished?: boolean
}

export type AuthorType = {
  id : number
  email: string
}
