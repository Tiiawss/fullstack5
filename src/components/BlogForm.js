import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, notification }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogLikes, setLikes] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    addBlog({ blogTitle, blogAuthor, blogUrl, blogLikes }).then(createdBlog => {
      notification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      setLikes(0)
    })
      .catch(error => {
        notification(error.response.data, true)
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:
          <input type='text'
            name='title'
            value={blogTitle}
            id='blogTitle'
            placeholder='Title'

            onChange={({ target }) =>
              setBlogTitle(target.value)} />
        </div>
        <div>
          Author:
          <input type='text'
            name='author'
            value={blogAuthor}
            id='blogAuthor'
            placeholder='Author'

            onChange={({ target }) => setBlogAuthor(target.value)} />
        </div>
        <div>
          Url:
          <input type='text'
            name='url'
            value={blogUrl}
            id='blogUrl'
            placeholder='URL'

            onChange={({ target }) => setBlogUrl(target.value)} />
        </div>

        <button type='submit' id='blogButton'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired
}

export default BlogForm