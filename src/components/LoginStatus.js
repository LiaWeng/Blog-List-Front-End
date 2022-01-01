import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/loginReducer'

const LoginStatus = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    window.localStorage.clear()
    dispatch(logoutAction())
  }

  return (
    <div>
      {user.name} logged in &nbsp;
      <button onClick={handleLogOut}>log out</button>
    </div>
  )
}

export default LoginStatus