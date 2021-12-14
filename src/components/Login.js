import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser, addMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const credentials = {
      username, password
    }

    try {
      const user = await loginService.login(credentials)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch(err) {
      addMessage('incorrect username or password', 'red')
    }
  }

  return (
    <div>
      <h2>login to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default Login