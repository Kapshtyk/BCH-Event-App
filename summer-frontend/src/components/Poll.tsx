import React, { useContext, useEffect, useState } from 'react'
import { PollsQuiestion, PollsChoice, PollsVote } from '../types/polls'
import { checkPoll, postVote } from '../api/EventsAPI'
import { CurrentUserContext, PollsQuestionContext } from '../context/context'

interface PollProps {
  data: PollsQuiestion
}

const Poll: React.FC<PollProps> = ({ data }) => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const fetchPollsQuestions = useContext(PollsQuestionContext).fetchPollsQuestions
  const [choice, setChoice] = useState<number | null>(null)
  const [vote, setVote] = useState<PollsVote[]>([]);

  useEffect(() => {
    if (currentUser && 'user' in currentUser && data.question) {
      checkPoll(data.id, currentUser.user).then((data) => {
        if (data.length > 0) {
          setVote(data)
        }
      })
    }
  }, [currentUser])

  const makeVote = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(vote)
    if (currentUser && 'user' in currentUser && choice !== null) {
      try {
        const result = await postVote(data.id, choice, currentUser.user)
        if ('id' in result) {
          console.log(result)
          fetchPollsQuestions()
        } else {
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedChoice = parseInt(event.target.value, 10)
    setChoice(selectedChoice)
  }

  if (!data) {
    return <div>Loading</div>
  }

  const votes: number = data.pollsChoices.reduce((total, choice) => total + choice.votes, 0)
  return (
    <div>
      <div key={data.id}>
        <fieldset>
          <legend>{data.question}</legend>
          {data.pollsChoices
            .sort((a, b) => b.votes - a.votes)
            .map((choice: PollsChoice) => (
              <div key={choice.id}>
                <input
                  type="radio"
                  id={choice.choice}
                  name={data.id.toString()}
                  value={choice.id.toString()}
                  onChange={handleChoiceChange}

                />
                <label htmlFor={choice.choice}>
                  {choice.choice}: {Math.round((choice.votes / votes) * 10000) / 100}%
                </label>
              </div>
            ))}
          Total votes:{` ${votes}`}
          
          <button onClick={makeVote}>VOTE!</button>
        </fieldset>
      </div>
    </div>
  )
}

export default Poll
