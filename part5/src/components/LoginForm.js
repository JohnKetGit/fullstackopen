import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  errorMessage,
  color
}) => (
  <form onSubmit={handleLogin}>
    <h2>Login to application</h2>

    <Notification message={errorMessage} result={color} />

    <div>
        username:{' '}
      <input
        id='username'
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>

    <div>
        password:{' '}
      <input
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>

    <br/>

    <button id="login-button" type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
