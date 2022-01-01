import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/loginReducer'

const Login = () => {
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
      <h2>login to the application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='loginButton' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default Login