import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin
}) => (
  <form onSubmit={handleLogin}>
    <h2>Login to application</h2>

    <Notification />

    <div>
        username:{' '}
      <input
        id='username'
        type="text"
        name="Username"
      />
    </div>

    <div>
        password:{' '}
      <input
        id='password'
        type="password"
        name="Password"
      />
    </div>

    <br/>

    <button id="login-button" type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
