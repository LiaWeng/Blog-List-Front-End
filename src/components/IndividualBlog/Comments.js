import React, { useState } from 'react'
import commentService from '../../services/comments'

const CommentForm = ({ blog, comments, setComments }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newComment = {
      content: comment,
      blog: blog.id
    }

    const savedComment = await commentService.create(newComment)
    setComment('')
    setComments(comments.concat(savedComment))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={comment} onChange={(e) => setComment(e.target.value)}/>
      <button type='submit'>add comment</button>
    </form>
  )
}

const Comments = ({ blog }) => {
  const [comments, setComments] = useState(blog.comments)

  return (
    <div>
      <h2>Comments</h2>
      <CommentForm blog={blog} comments={comments} setComments={setComments}/>
      {comments.map(comment =>
        <div key={comment.id}>{comment.content}</div>
      )}
    </div>
  )
}

export default Comments