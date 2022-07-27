import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import Like from './Like'
import AddBlogForm from './AddBlogForm'

describe('<Blog />', () => {
  test('renders blog without likes and url', () => {
    const blog = {
      title: 'helo',
      author: 'test author',
      url: 'test url',
      likes: 5
    }

    const { container } = render(<Blog blogData={blog}  />)
    const element = container.querySelector('.blog-less')
    const likes = container.querySelector('.likes')
    const url = container.querySelector('.url')
    expect(element).toBeDefined()
    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('likes and url shown when button clicked', async () => {
    const blog = {
      title: 'helo',
      author: 'test author',
      url: 'test url',
      likes: 5
    }

    const user = userEvent.setup()
    const { container } = render(<Blog  blogData={blog} />)
    const button = container.querySelector('.toggleDetail')
    await user.click(button)

    const detail = container.querySelector('.blog-more')
    const likes = container.querySelector('.likes')
    const url = container.querySelector('.url')
    expect(detail).toBeDefined()
    expect(likes).toBeDefined()
    expect(url).toBeDefined()

  })

  test('registers twice if like button clicked twice', async () => {
    const likeStyle = {
      color: 'white',
      background: '#24a0ed',
      border: 5
    }
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<Like likeHandler={mockHandler} likeStyle={likeStyle} />)
    const button = screen.getByText('Like')

    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('creates a new blog', async () => {
    const mockHandler = jest.fn()
    const mockHide = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<AddBlogForm createBlog={mockHandler} hideBlogForm={mockHide} />)
    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const send = container.querySelector('#send')

    await user.type(title, 'Simbaaa')
    await user.type(author, 'Simbaa')
    await user.type(url, 'www.wikipedia.com')

    await user.click(send)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})