import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogAction } from '../../reducers/blogReducer'
import { messageAction } from '../../reducers/messageReducer'
import blogService from '../../services/blogs'

const BlogForm = ({ blogFormRef, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (title === '' || url === '') {
      dispatch(messageAction('Must have title or url', 'FAIL'))
    } else {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      blogFormRef.current.toggleVisibility()
      const config = blogService.setConfig(user.token)

      dispatch(addBlogAction(newBlog, config))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add new blogs</h2>
      <form onSubmit={handleSubmit} role='form'>
        <div>
          title
          <input
            data-testid='title'
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid='author'
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid='url'
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='addBlogButton' type='submit'>add</button>
      </form>
    </div>
  )
}

export default BlogForm