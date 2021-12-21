import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('displays title and author on default, not url and likes', () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    }

    const component = render(<Blog blog={blog}/>)

    const blogInfo = component.container.querySelector('.blogInfo')
    expect(blogInfo).toHaveTextContent('First class tests')

    const blogDetail = component.container.querySelector('.blogDetail')
    expect(blogDetail).toBe(null)
  })

  test('shows url and likes after clicking the view button', () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    }

    const component = render(<Blog blog={blog}/>)

    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    const blogDetail = component.container.querySelector('.blogDetail')
    expect(blogDetail).toHaveTextContent(blog.url)
  })

  test('calls event handler when clicking the like button', () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    }

    const updateLike = jest.fn()
    render(<Blog blog={blog} updateLike={updateLike} />)

    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    expect(updateLike.mock.calls).toHaveLength(1)
  })
})
