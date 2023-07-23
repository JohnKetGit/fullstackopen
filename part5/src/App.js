import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
      errorMessage={errorMessage}
      color={color}
    />
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      setColor('red')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm newBlog={addBlog} />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setErrorMessage(
          `A new blog: ${blogObject.title} by ${blogObject.author} has been added.`
        )
        setColor('green')
      })
      .catch(() => {
        setErrorMessage(
          `Error while trying to create blog: ${blogObject.title}`
        )
        setColor('red')
      })

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then((updatedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.id !== blogObject.id ? blog : updatedBlog))
        )

        setErrorMessage(`${updatedBlog.title} was successfully updated`)
        setColor('green')

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Remove blog: ${blogObject.title} by ${blogObject.author}?`)) {
      blogService.remove(blogObject.id)
      setErrorMessage(`${blogObject.title} was successfully deleted`)
      setColor('green')
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ? loginForm() :
        <div>
          <h2>Blogs</h2>

          <Notification message={errorMessage} result={color} />

          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}

          <br/>

          {blogs
            .filter(blog => blog.user.username === user.username).sort(function(a, b){return b.likes - a.likes})
            .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />)
          }
        </div>
      }
    </div>
  )
}

export default App
