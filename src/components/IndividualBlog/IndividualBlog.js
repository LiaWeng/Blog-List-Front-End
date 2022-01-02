import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateBlogAction } from '../../reducers/blogReducer'

import Comments from './Comments'

import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Divider from '@mui/material/Divider'

const IndividualBlog = ({ blogs, users }) => {
  const dispatch = useDispatch()
  const params = useParams()

  if (blogs.length === 0 || users.length === 0) {
    return null
  }

  const blog = blogs.find(blog => blog.id === params.blogId)
  const user = users.find(user => user.id === blog.user || user.id === blog.user.id)

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    dispatch(updateBlogAction(updatedBlog, blog.id))
  }

  return (
    <div>
      <h2>{blog.title} -- by {blog.author}</h2>

      <div style={{ marginBottom: 10 }}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer" >{blog.url}</a>
      </div>

      <div style={{ marginBottom: 10 }}>
        {blog.likes} likes
        <IconButton
          variant='contained'
          color='primary'
          size='small'
          style={{ marginLeft: 10, paddingBottom: 10 }}
          className='likeButton'
          onClick={handleLike}
        >
          <ThumbUpIcon />
        </IconButton>
      </div>

      <div style={{ marginBottom: 30 }}>
        Added by {user.name}
      </div>

      <Divider />

      <Comments blog={blog} />
    </div>
  )
}

export default IndividualBlog