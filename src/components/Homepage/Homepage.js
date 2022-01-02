import React, { useState } from 'react'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
// import Togglable from './Togglable'
import Message from '../Message'

import Button from '@mui/material/Button'

const Homepage = ({ message, user, blogs }) => {
  const [visibility, setVisibility] = useState(false)

  const hiddenWhenVisible = { display: visibility ? 'none' : '' }
  const shownWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    console.log(visibility)
    setVisibility(!visibility)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Button
        variant='contained'
        style={hiddenWhenVisible}
        disableElevation
        onClick={toggleVisibility}
      >
        add new blog
      </Button>

      <div style={shownWhenVisible}>
        <BlogForm user={user} toggleVisibility={toggleVisibility} />
      </div>

      {message && <Message />}
      <Blogs blogs={blogs} />
    </div>
  )
}

export default Homepage