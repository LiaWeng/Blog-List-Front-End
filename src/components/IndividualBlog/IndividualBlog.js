import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateBlogAction } from '../../reducers/blogReducer'

import Comments from './Comments'

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
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    dispatch(updateBlogAction(updatedBlog, blog.id))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={blog.url} target="_blank" rel="noopener noreferrer" >{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <button className='likeButton' onClick={handleLike}>like</button>
      </div>
      <div>added by {user.name}</div>
      <Comments blog={blog} />
    </div>
  )
}

export default IndividualBlog