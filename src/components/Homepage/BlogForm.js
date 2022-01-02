import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogAction } from '../../reducers/blogReducer'
import { messageAction } from '../../reducers/messageReducer'
import blogService from '../../services/blogs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const BlogForm = ({ user, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (title === '' || url === '') {
      dispatch(messageAction('Must have title and url', 'FAIL'))
    } else {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      toggleVisibility()
      const config = blogService.setConfig(user.token)

      dispatch(addBlogAction(newBlog, config))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Add new blogs</h3>
      <form onSubmit={handleSubmit} role='form'>
        <div>
          <TextField
            label='Title'
            style={{ width: 500, marginBottom: 10, marginTop: -10 }}
            variant='standard'
            data-testid='title'
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Author'
            style={{ width: 500, marginBottom: 10 }}
            variant='standard'
            data-testid='author'
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Url'
            style={{ width: 500, marginBottom: 20 }}
            variant='standard'
            data-testid='url'
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          variant='contained'
          disableElevation
          id='addBlogButton'
          type='submit'
        >
          add blog
        </Button>
        <Button
          variant='outlined'
          style={{ marginLeft: 20 }}
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </form>
    </div>
  )
}

export default BlogForm