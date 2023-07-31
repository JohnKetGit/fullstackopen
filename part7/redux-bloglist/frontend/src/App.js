import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { initializeAllComments } from './reducers/commentReducer'
import UserDisplay from './components/UserDisplay'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { logout } from './reducers/authReducer'
import EachUser from './components/EachUser'
import EachBlog from './components/EachBlog'


import {
  Routes,
  Route,
  Link,

} from 'react-router-dom'


const App = () => {
  const authUsers = useSelector( state => state.authUser )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
    dispatch(initializeAllComments())
  }, [dispatch])

  const padding = {
    padding: 5,
    textDecoration: 'none'
  }

  const Home = () => {
    return (
      <div>
        <h1>Blogs App</h1>
        <AddBlogForm />
        <BlogList />
      </div>
    )
  }

  const Blogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <BlogList />
      </div>
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch( logout() )
  }

  return (
    <div className='container'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" as="span">
                <Link style={padding} to='/'>Home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to='/blogs'>Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to='/users'>Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                { authUsers
                  ? <div>
                    <em> {authUsers.name} logged in </em>
                    <button type="submit" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                  : <Link style={padding} to='/login'>Login</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Notification />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={authUsers? <Home /> : <LoginForm />} />
        <Route path='/users' element={<UserDisplay />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path="/users/:id" element={<EachUser />} />
        <Route path="/blogs/:id" element={<EachBlog />} />
      </Routes>
    </div>
  )
}

export default App
