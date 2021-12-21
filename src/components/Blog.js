import React, { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    borderBottom: '0.5px solid black',
    marginBottom: '10px',
    paddingBottom: '10px'
  }

  const blogDetailStyle = {
    display: showDetail ? '' : 'none'
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
    <div className='blogItem' style={blogStyle}>
      <div className='blogInfo'>
        {blog.title} -- {blog.author}
        <button
          className='viewButton'
          onClick={() => {setShowDetail(!showDetail)}}
        >
          {showDetail ? 'hide' : 'view'}
        </button>
        <button
          className='deleteButton'
          onClick={() => {handleDelete(blog.id)}}
        >
          delete
        </button>
      </div>

      <div className='blogDetail' style={blogDetailStyle}>
        <div>{blog.url}</div>
        <div>
          likes <span className='numberOfLikes'>{blog.likes}</span>
          <button className='likeButton' onClick={handleLike}>like</button>
        </div>
      </div>

      {/* {showDetail ?
        <div className='blogDetail'>
          <div>{blog.url}</div>
          <div>
            likes <span className='numberOfLikes'>{blog.likes}</span>
            <button className='likeButton' onClick={handleLike}>like</button>
          </div>
        </div> :
        null
      } */}
    </div>
  )
}

export default Blog