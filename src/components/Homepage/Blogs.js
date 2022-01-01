import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const sortedBlogs = blogs.sort((currentBlog, nextBlog) => {
    return nextBlog.likes - currentBlog.likes
  })

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Blogs