import React from 'react'

const Blog = ({ blogs, user }) => {
  const blogsToShow = blogs.filter(blog => blog.user.username === user.username)
  const newBlog = blogs.filter(blog => blog.user === user.id)
  const blogsWithNew = blogsToShow.concat(newBlog)

  return (
    <div>
      <h2>blogs</h2>
      {blogsWithNew.map(blog => <div key={blog.id}>{blog.title} -- {blog.author} </div>)}
    </div>
  )
}

export default Blog