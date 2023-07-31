import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm test for adding new blog', () => {
  const mockHandler = jest.fn()

  const component = render(<BlogForm newBlog={mockHandler} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Test1' }
  })

  fireEvent.change(author, {
    target: { value: 'Tester1' }
  })

  fireEvent.change(url, {
    target: { value: 'https://testing.com' }
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Test1')
  expect(mockHandler.mock.calls[0][0].author).toBe('Tester1')
  expect(mockHandler.mock.calls[0][0].url).toBe('https://testing.com')
})
