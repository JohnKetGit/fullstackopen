import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    dispatch(login(username, password))
    dispatch(initializeBlogs())
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            id="username"
            placeholder='Enter your username...'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            id="password"
            placeholder='Enter your password...'
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm