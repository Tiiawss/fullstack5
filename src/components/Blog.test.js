import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const notify = jest.fn()
  const user = userEvent.setup()

  addBlog.mockResolvedValue({
    title: 'testi',
    author: 'testi',
    url: 'testi'
  })

  render(<BlogForm addBlog={addBlog} notification={notify} />)
  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('URL')
  const create = screen.getByText('create')


  await user.type(title, 'testi')
  await user.type(author, 'testi')
  await user.type(url, 'testi')
  await user.click(create)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0])
    .toStrictEqual({
      blogTitle: 'testi',
      blogAuthor: 'testi',
      blogUrl: 'testi',
      blogLikes: ''
    })
})

test('Togglable hides url and likes as default', async () => {
  const addBlog = jest.fn()
  const notify = jest.fn()
  const user = userEvent.setup()

  addBlog.mockResolvedValue({
    title: 'testi',
    author: 'testi',
    url: 'urltesti'
  })

  render(<BlogForm addBlog={addBlog} notification={notify} />)
  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('URL')
  const create = screen.getByText('create')


  await user.type(title, 'testi')
  await user.type(author, 'testi')
  await user.type(url, 'urltesti')
  await user.click(create)

  expect(addBlog.mock.calls).toHaveLength(1)

  const noUrl = screen.queryByText('urltesti')
  expect(noUrl).toBeNull()
  const noLikes = screen.queryByText('likes')
  expect(noLikes).toBeNull()

})
test('Cliking view shows url and likes', async () => {

  const blog = {
    title: 'testi',
    author: 'testi',
    url: 'urltesti',
    likes: 5,
    user: { username: 'mluukkai', name: 'mluukkai' }
  }
  let user, mockLike, mockRemove

  user = { username: 'mluukkai' }
  mockLike = jest.fn()
  mockRemove = jest.fn()

  render( <Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={mockRemove} />)
  const event = userEvent.setup()
  const button = screen.getByText('view')
  await event.click(button)
  const testiUrl = screen.queryByText('urltesti')
  expect(testiUrl).toBeChecked

})
test('Cliking like works', async () => {

  const blog = {
    title: 'testi',
    author: 'testi',
    url: 'urltesti',
    likes: 5,
    user: { username: 'mluukkai', name: 'mluukkai' }
  }
  let user, mockLike, mockRemove

  user = { username: 'mluukkai' }
  mockLike = jest.fn()
  mockRemove = jest.fn()

  render( <Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={mockRemove} />)
  const event = userEvent.setup()
  const button = screen.getByText('view')
  await event.click(button)



})