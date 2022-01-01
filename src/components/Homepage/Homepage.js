import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import Togglable from './Togglable'
import Message from '../Message'

const Homepage = ({ message, user, blogs }) => {
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable label={'add new blog'} ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} user={user} />
      </Togglable>

      {message && <Message />}
      <Blogs blogs={blogs} />
    </div>
  )
}

export default Homepage