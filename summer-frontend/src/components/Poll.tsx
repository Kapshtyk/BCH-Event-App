import React, { useContext, useEffect, useState } from 'react'
import { PollsQuiestion, PollsChoice, PollsVote } from '../types/polls'
import { checkPoll, postVote } from '../api/EventsAPI'
import { CurrentUserContext, PollsQuestionContext } from '../context/context'
import cl from './Poll.module.css'

interface PollProps {
  data: PollsQuiestion
}

const Poll: React.FC<PollProps> = ({ data }) => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const fetchPollsQuestions =
    useContext(PollsQuestionContext).fetchPollsQuestions
  const [choiceInput, setChoiceInput] = useState<number | null>(null)
  const [vote, setVote] = useState<PollsVote | null>(null);

  useEffect(() => {
    if (currentUser && 'user' in currentUser && data && data.question) {
      checkPoll(data.id, currentUser.user).then((data) => {
        console.log(data)
        if (data.length > 0) {
          setVote(data[0])
        }
      })
    }
  }, [data, currentUser])

  useEffect(() => {
    if (vote) {
      const segments = vote.choice.split('/')
      const value = segments[segments.length - 1]
      setChoiceInput(parseInt(value, 10))
    }
  }, [vote])

  const makeVote = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (currentUser && 'user' in currentUser && choiceInput !== null) {
      try {
        const result = await postVote(data.id, choiceInput, currentUser.user)
        if ('id' in result) {
          console.log(result)
          fetchPollsQuestions()
          setVote({id: result.id,
                   question: result.question,
                   choice: result.choice,
                   author: result.author})
        } else {
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedChoice = parseInt(event.target.value, 10)
    setChoiceInput(selectedChoice)
  }

  if (!data) {
    return <div>Loading</div>
  }

  const checkVoteExists = () => {
    return !!(vote && 'id' in vote)
  }

  const votes: number = data.pollsChoices.reduce(
    (total, choice) => total + choice.votes,
    0
  )

  return (
    <div>
      <div key={data.id}>
        <fieldset className={cl.poll_container}>
          <legend>{data.question}</legend>
          {data.pollsChoices.map((choice: PollsChoice) => (
            <div className={cl.poll_row} key={choice.id}>
              <div className={cl.poll_left_column}>
              <div className={cl.poll_percentage}>
                {Math.round((choice.votes / votes) * 10000) / 100}%
              </div>
                  <input
                    type="radio"
                    id={choice.choice}
                    name={data.id.toString()}
                    value={choice.id.toString()}
                    onChange={handleChoiceChange}
                    disabled={!currentUser || checkVoteExists()}
                    checked={choiceInput === choice.id}
                  />
              </div>
              <div className={cl.poll_choice}>
                <div className={cl.poll_radio}>
                  <label htmlFor={choice.choice}>{choice.choice}:</label>
                </div>
                <div className={cl.poll_progress_div}>
                  <progress 
                    className={cl.poll_progress_bar}
                    max="100"
                    value={Math.round((choice.votes / votes) * 10000) / 100}
                  ></progress>
                </div>
              </div>
            </div>
          ))}
          Total votes:{` ${votes}`}
          {!checkVoteExists() && currentUser && <button onClick={makeVote}>VOTE!</button>}
          {checkVoteExists() && currentUser && <div>You have already participated in this poll!</div>}
          {!currentUser && <div>Sign in if you want to participate!</div>}
        </fieldset>
      </div>
    </div>
  )
}

export default Poll
