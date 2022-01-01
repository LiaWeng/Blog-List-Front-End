import React, { useEffect, useState } from 'react'

import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Navigation from './components/Navigation/Navigation'
import Homepage from './components/Homepage/Homepage'
import Users from './components/Users'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog/IndividualBlog'

import userService from './services/users'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogAction } from './reducers/blogReducer'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const message = useSelector(state => state.message)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogAction())
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (loggedUser) {
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
    }
  }, [])

  useEffect(() => {
    userService
      .getUsers()
      .then(users => {setUsers(users)})
  }, [])

  return (
    <div>
      {user === null ?
        <div>
          <LoginForm />
          {message && <Message />}
        </div> :
        <div>
          <Navigation user={user} />
          <Routes>
            <Route path='/' element={<Homepage message={message} user={user} blogs={blogs} />}/>
            <Route path='/users' element={<Users users={users} />} />
            <Route path='/users/:userId' element={<IndividualUser users={users} />} />
            <Route path='blogs/:blogId' element={<IndividualBlog blogs={blogs} users={users} />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App