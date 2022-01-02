import React from 'react'
import { Link } from 'react-router-dom'
import LoginStatus from './LoginStatus'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

const Navigation = ({ user }) => {
  return (
    <AppBar position='static' style={{ marginBottom: 30 }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div>
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
        </div>
        <div>
          <LoginStatus
            user={user}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation