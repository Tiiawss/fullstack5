import React from 'react'
import PropTypes from 'prop-types'

const LoginInfo = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      {user.name} logged in
      <button
        onClick={logout}>logout</button>

    </div>
  )
}

LoginInfo.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoginInfo