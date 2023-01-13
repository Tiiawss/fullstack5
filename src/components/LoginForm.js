import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user =
      await loginService.login({ username, password })
      props.setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user))
    } catch (exception) {
      props.notification(
        exception.response.data, true)
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type='text'
            value={username}
            name='Username'
            id='loginUsername'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password:
          <input
            type='password'
            value={password}
            name='Password'
            id='loginPassword'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit' id='logiButton'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired
}

export default LoginForm