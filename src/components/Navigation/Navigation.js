import React from 'react'
import { Link } from 'react-router-dom'
import LoginStatus from '../LoginStatus'

const Navigation = ({ user }) => {
  return (
    <div>
      <Link to='/'>
        blogs
      </Link>
      <Link to='/users'>
        users
      </Link>
      <LoginStatus user={user} />
    </div>
  )
}

export default Navigation