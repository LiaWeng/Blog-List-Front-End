import React, { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    borderBottom: '0.5px solid black',
    marginBottom: '10px',
    paddingBottom: '10px'
  }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    await updateLike(updatedBlog, blog.id)
  }

  const handleDelete = async (blogId) => {
    const result = window.confirm(`Delete ${blog.title}?`)

    if (result) {
      await deleteBlog(blogId)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} -- {blog.author}
        <button onClick={() => {setShowDetail(!showDetail)}}>
          {showDetail ? 'hide' : 'view'}
        </button>
        <button onClick={() => {handleDelete(blog.id)}}>delete</button>
      </div>

      {showDetail ?
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
        </div> :
        <div></div>
      }
    </div>
  )
}

export default Blog