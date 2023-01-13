import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, user }) => {
  const [viewButtonLabel, setViewButtonLabel] = useState('view')
  const blogStyle = {
    paddingTop: 11,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 6
  }

  const showAll = () => {
    console.log('here')
    viewButtonLabel === 'view' ?
      setViewButtonLabel('hide')
      : setViewButtonLabel('view')
  }

  return (
    <div style={blogStyle} className='blog' >
      {blog.title}
      {blog.author}
      <button onClick={showAll}>
        {viewButtonLabel}</button><br />
      {viewButtonLabel === 'hide' && (
        <div>
          {blog.url}<br />
          likes {blog.likes}
          <button onClick={() => like(blog)}>like</button><br />

          {blog.user.name}<br />

          {user.username === blog.user.username &&
            <button
              onClick={() =>
                remove(blog)}
              style={{ backgroundColor: 'aqua' }}> remove
            </button>
          }
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog