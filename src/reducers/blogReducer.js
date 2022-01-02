import blogService from '../services/blogs'
import { messageAction } from './messageReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'ADD':
      return state.concat(action.data)
    case 'UPDATE': {
      const newBlogs = state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )

      return newBlogs
    }
    default: return state
  }
}

export const initializeBlogAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export const addBlogAction = (newBlog, config) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog, config)
    dispatch({
      type: 'ADD',
      data: savedBlog
    })
    dispatch(messageAction(`added ${savedBlog.title} -- ${savedBlog.author}`, 'SUCCESS'))
  }
}

export const updateBlogAction = (updatedBlog, blogId) => {
  return async (dispatch) => {
    const savedBlog = await blogService.update(updatedBlog, blogId)

    dispatch({
      type: 'UPDATE',
      data: savedBlog
    })
  }
}

export const deleteBlogAction = (blogId) => {
  return async (dispatch, getState) => {
    try {
      const { user, blogs } = getState()
      const config = blogService.setConfig(user.token)

      await blogService.remove(blogId, config)
      const newBlogs = blogs.filter(blog => blog.id !== blogId)

      dispatch({
        type: 'UPDATE',
        data: newBlogs
      })
    } catch (error) {
      dispatch(messageAction('cannot delete this blog', 'FAIL'))
    }
  }
}

export default blogReducer