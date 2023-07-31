import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('Blog js tests', () => {
  let component

  const blog = {
    title: 'Testing1',
    author: 'tester1',
    url: 'https://tester.com',
    likes: 1,
    user: { 'username':'May','name':'May','id':'64b79d44155eca8b3d6ca8a5' }
  }

  const mockHandler = jest.fn()

  beforeEach(() => {component = render(<Blog blog={blog} updateBlog={mockHandler} />)})

  test('Render only blog title and author by default', () => {
    const div = component.container.querySelector('.toggleView')

    expect(div).toHaveStyle('display: none')
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('Toggle view will show blog url and likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://tester.com')

    expect(component.container).toHaveTextContent(1)
  })

  test('Like button clicked twice, event handler execute twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
