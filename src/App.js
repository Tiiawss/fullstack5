import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'

import Blogs from './components/Blogs.js'

import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [userNotification, setUserNotification] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    const blogappuserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(blogappuserJSON)
    if (blogappuserJSON) {
      setUser(JSON.parse(blogappuserJSON))
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll()
        .then(blogs => setBlogs(blogs))
    } else {
      setBlogs([])
    }
  }, [user])

  const notification = (message, error) => {
    setUserNotification({ text: message, error })
    console.log(message)
    setTimeout(() => setUserNotification(null), 10000)
  }

  const addBlog = (props) => {

    const newBlog = {
      title: props.blogTitle,
      author: props.blogAuthor,
      url: props.blogUrl,
      likes: 0
    }

    return (blogService
      .create(user, newBlog)
      .then(createdBlog => {
        createdBlog.user = {
          id: createdBlog.user,
          name: user.name,
          username: user.username
        }

        setBlogs(blogs.concat(createdBlog))
        blogFormRef.current.toggleVisibility()
        console.log(createdBlog)
        return createdBlog
      }))
  }

  return (
    <div>
      <h1>blogs</h1>

      {userNotification &&
      <Notification message={userNotification} />}
      {!user &&
      <LoginForm setUser={setUser} notification={notification} />}
      {user &&
        <div>
          <LoginInfo
            user={user}
            setUser={setUser} />
          <Togglable
            showLabel='new blog'
            hideLabel='cancel'
            ref={blogFormRef} >
            <BlogForm
              addBlog={addBlog}
              notification={notification} />
          </Togglable>
          <Blogs blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            notification={notification} />
        </div>
      }
    </div>
  )
}

export default App