import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogAction } from '../../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    borderBottom: '0.5px solid black',
    marginBottom: '10px',
    paddingBottom: '10px'
  }

  const handleDelete = (blogId) => {
    const result = window.confirm(`Delete ${blog.title}?`)

    if (result) {
      dispatch(deleteBlogAction(blogId))
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
    </div>
  )
}

export default Blog