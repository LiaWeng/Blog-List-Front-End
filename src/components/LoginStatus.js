import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/loginReducer'

import Button from '@mui/material/Button'

const LoginStatus = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    window.localStorage.clear()
    dispatch(logoutAction())
  }

  return (
    <div>
      <em>
        Logged in as {user.name}
      </em>
      <Button
        variant='outlined'
        style={{ color: 'white', borderColor: 'white', marginLeft: 30 }}
        onClick={handleLogOut}
      >
        log out
      </Button>
    </div>
  )
}

export default LoginStatus