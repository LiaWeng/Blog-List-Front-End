import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateNew = ({ user, blogs, setBlogs, addMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const token = 'bearer ' + user.token
    const response = await blogService.create(newBlog, token)
    setBlogs(blogs.concat(response))
    addMessage(`added ${title} -- ${author}`, 'green')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add new blogs</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default CreateNew