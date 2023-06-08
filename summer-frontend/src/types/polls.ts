export type PollsQuiestion = {
  id: number
  question: string
  createdAt: Date
  pollsChoices: PollsChoice[]
  isPublished: boolean
  event?: string
}

export type PollsChoice = {
  id: number
  choice: string
  votes: number
  question?: string
}

export type PollsVote = {
  id?: number
  question: string
  choice: string
  author: string
}
