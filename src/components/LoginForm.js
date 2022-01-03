import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/loginReducer'

import Message from './Message'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = ({ message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const credentials = { username, password }

    dispatch(loginAction(credentials))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Welcome to the Blog List :)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label='Username'
            style={{ marginBottom: 10 }}
            id='username'
            variant='standard'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <TextField
            label='Password'
            style={{ marginBottom: 20 }}
            id='password'
            variant='standard'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <Button
          variant='contained'
          id='loginButton'
          type='submit'
        >
          login
        </Button>
      </form>
      {message && <Message />}
    </div>
  )
}

export default Login