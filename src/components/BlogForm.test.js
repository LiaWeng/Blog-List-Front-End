import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler when submit button is clicked', async () => {
    const promise = Promise.resolve()
    const createBlog = jest.fn(() => promise)

    act(() => {
      render(<BlogForm createBlog={createBlog} />)
    })

    const titleInput = screen.getByTestId('title')
    const authorInput = screen.getByTestId('author')
    const urlInput = screen.getByTestId('url')

    fireEvent.change(titleInput, {
      target: { value: 'First class tests' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Robert C. Martin' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html' }
    })

    const form = screen.getByRole('form')

    fireEvent.submit(form)

    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].title).toBe('First class tests')
    expect(createBlog.mock.calls[0][0].author).toBe('Robert C. Martin')
    expect(createBlog.mock.calls[0][0].url).toBe('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')

    await act(() => promise)
  })
})