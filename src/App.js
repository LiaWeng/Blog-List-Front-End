import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import LoginStatus from './components/LoginStatus'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('white')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])
  
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (loggedUser) {
      setUser(loggedUser)
    }
  }, [])

  const addMessage = (message, color) => {
    setMessage(message)
    setMessageColor(color)
    setTimeout(() => setMessage(null), 5000)
    setTimeout(() => setMessageColor('white'), 5000)
  }

  const createUser = ({ credentials }) => {
    loginService
      .login(credentials)
      .then(savedUser => {
        setUser(savedUser)
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(savedUser)
        )
      })
      .catch(error => {
        addMessage('incorrect username or password', 'red')
      })
  }

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const token = blogService.setConfig(user.token)

    blogService
      .create(newBlog, token)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
        addMessage(`added ${savedBlog.title} -- ${savedBlog.author}`, 'green')
      })
  }

  const updateLike = (updatedBlog, blogId) => {
    blogService
      .update(updatedBlog, blogId)
      .then(savedBlog => {
        const newBlogs = blogs.map(blog => 
          blog.id === savedBlog.id ? savedBlog : blog
        )
        setBlogs(newBlogs)
        addMessage(`updated ${savedBlog.title} -- ${savedBlog.author}`, 'green')
      })
  }

  const deleteBlog = (blogId) => {
    const token = blogService.setConfig(user.token)

    blogService
      .remove(blogId, token)
      .then(() => {
        const newBlogs = blogs.filter(blog => blog.id !== blogId)
        setBlogs(newBlogs)
      })
  }

  return (
    <div>
      {user === null ?
        <div>
          <LoginForm createUser={createUser}/>
          <Message message={message} messageColor={messageColor} />
        </div> :
        <div>
          <LoginStatus user={user} setUser={setUser} />

          <Togglable label={'add new blog'} ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <Message message={message} messageColor={messageColor} />
          <Blogs blogs={blogs} user={user} updateLike={updateLike} deleteBlog={deleteBlog} /> 
        </div>
      }   
    </div>
  )
}

export default App