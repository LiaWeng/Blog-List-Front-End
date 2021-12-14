import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import LoginStatus from './components/LoginStatus'
import Message from './components/Message'
import CreateNew from './components/CreateNew'
import Blog from './components/Blog'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')

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

  return (
    <div>
      {user === null ?
        <div>
          <Login setUser={setUser} addMessage={addMessage} />
          <Message message={message} messageColor={messageColor} />
        </div> :
        <div>
          <LoginStatus user={user} setUser={setUser} />
          <CreateNew user={user} blogs={blogs} setBlogs={setBlogs} addMessage={addMessage} />
          <Message message={message} messageColor={messageColor} />
          <Blog blogs={blogs} user={user} />
        </div>
      }   
    </div>
  )
}

export default App