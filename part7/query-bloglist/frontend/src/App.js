import { useEffect, useRef, useContext } from 'react'
import { useQuery } from 'react-query'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import loginService from './services/login'

import { useNotificationDispatch } from './notificationContext'
import UserContext from './userContext'
import { getBlogs, setToken } from './request'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)

  const dispatch = useNotificationDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'setUser', payload: user })
      setToken(user.token)
    }
    else {
      userDispatch({ type: 'setUser', payload: null })
    }
  }, [])

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
    />
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setToken(user.token)
      userDispatch({ type: 'setUser', payload: user })
    } catch (exception) {
      dispatch({ type: 'displayNotification', payload: 'Wrong username or password!' })

      setTimeout(() => {
        dispatch({ type: 'clearNotification' })
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    userDispatch({ type: 'clearUser' })
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const result = useQuery(
    'blogs',
    getBlogs,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if( result.isError ){
    return<div>blog service not available due to problem in server</div>
  }

  const blogs = result.data

  return (
    <div>
      {user === null ? loginForm() :
        <div>
          <h2>Blogs</h2>

          <Notification />

          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}

          <br/>

          {blogs
            .filter(blog => blog.user.username === user.username).sort(function(a, b){return b.likes - a.likes})
            .map(blog => <Blog key={blog.id} blog={blog}/>)
          }
        </div>
      }
    </div>
  )
}

export default App
