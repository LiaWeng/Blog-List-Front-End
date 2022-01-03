import React from 'react'
import { Link } from 'react-router-dom'
import LoginStatus from './LoginStatus'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

const Navigation = ({ user }) => {
  return (
    <AppBar position='static' style={{ marginBottom: 30 }}>
      <Toolbar style={{ justifyContent: 'space-around' }}>
        <Button
          style={{ color: 'white' }}
          component={Link}
          to='/'
        >
          blogs
        </Button>
        <Button
          style={{ color: 'white', marginLeft: 20 }}
          component={Link}
          to='/users'
        >
          users
        </Button>
        <LoginStatus
          user={user}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation