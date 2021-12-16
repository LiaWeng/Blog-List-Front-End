import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, updateLike, deleteBlog }) => {
  const blogsToShow = blogs.filter(blog => blog.user.username === user.username)
  const newBlog = blogs.filter(blog => blog.user === user.id)
  const blogsWithNew = blogsToShow.concat(newBlog)
  const sortedBlogs = blogsWithNew.sort((currentBlog, newBlog) => {
    return newBlog.likes - currentBlog.likes
  })

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog => <Blog blog={blog} updateLike = {updateLike} deleteBlog={deleteBlog} key={blog.id} />)}
    </div>
  )
}

export default Blogs