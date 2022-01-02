import React, { useState } from 'react'
import commentService from '../../services/comments'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
      <div>
        <TextField
          type='text'
          style={{ width: 500, marginBottom: 20 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button
        variant='contained'
        type='submit'
      >
        add comment
      </Button>
    </form>
  )
}

const Comments = ({ blog }) => {
  const [comments, setComments] = useState(blog.comments)

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Comments</h2>
      <CommentForm
        blog={blog}
        comments={comments}
        setComments={setComments}
      />

      <ul style={{ marginTop: 20 }}>
        {comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments