import React, { useContext, useState } from 'react'
import { CommentType } from '../types/events'
import { CurrentUserContext } from '../context/context'
import { updateComment } from '../api/EventsAPI'
import { is } from 'date-fns/locale'
import cl from './Comment.module.css'

const Comment = ({ comment }: { comment: CommentType }, event: number = 1) => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const [commentText, setCommentText] = useState(comment.text)
  const [isVisible, setIsVisible] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVisible(!isVisible)
    try {
      if (currentUser && event) {
        const response = await updateComment(comment.id, commentText, true)
        if ('message' in response) {
          console.error(response.message)
        } else {
          //refresh component
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleOnChange = (e: any) => {
    e.preventDefault()
    setCommentText(e.target.value)
  }

  return (
    <div>
      {!isVisible && (
        <div className={cl.comment_container}>
          <h3 className={cl.comment_author}>{comment.author.email}</h3>
          <input
            type="text"
            name="commentText"
            onChange={handleOnChange}
            value={commentText}
          />
          <button className={cl.comment_button} onClick={handleUpdate}>
            Save
          </button>
        </div>
      )}

      {isVisible && (
        <div className={cl.comment_container}>
          <h3 className={cl.comment_author}>{comment.author.email}</h3>
          <p>{comment.text}</p>
        </div>
      )}

      {!isVisible && <button onClick={handleUpdate}>Update</button>}
    </div>
  )
}

export default Comment
