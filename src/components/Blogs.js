import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Blog from './Blog'


const Blogs = ({ user, blogs, setBlogs, notification }) => {


  const remove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      blogService
        .remove(user, blog)
        .then(() => {
          setBlogs(
            blogs.filter(b => b.id !== blog.id))
          notification(
            `Removed blog ${blog.title} by ${blog.author}`)
        })
    }
  }

  const like = (blog) => {
    blogService
      .update(
        user, { ...blog, likes: blog.likes + 1 })
      .then(updatedBlog => {
        blog.likes = updatedBlog.likes
        setBlogs(
          [...blogs])
        notification(`
        Liked blog ${blog.title} by ${blog.author}`)
      })
  }



  return (
    <div id='blogsList'>
      {blogs.sort(
        (a, b) => b.likes - a.likes)
        .map(blog =>

          <Blog key={blog.id}
            blog={blog}
            like={like}
            remove={remove}
            user={user} />
        )}

    </div>

  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired
}

export default Blogs