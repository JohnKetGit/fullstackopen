import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../notificationContext'
import { updateLike,deleteBlog } from '../request'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const blogDetail = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLikeMutation = useMutation(updateLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const handleLike = async (blog) => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })

    await dispatch({ type: 'displayNotification', payload: `${blog.title} was successfully updated` })

    setTimeout(() => {
      dispatch({ type: 'clearNotification' })
    }, 5000)
  }

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      deleteMutation.mutate(blog)

      await dispatch({ type: 'displayNotification', payload: `${blog.title} was successfully deleted!` })

      setTimeout(() => {
        dispatch({ type: 'clearNotification' })
      }, 5000)
    }
  }

  return (
    <div style={blogStyle}>
      <p className='title'>
        {blog.title} by {blog.author}{' '}
        <button onClick={toggleVisibility}>{blogDetail}</button>
      </p>
      <div className='toggleView' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{' '}
          <button id="like-button" onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>{blog.user.username}</p>
        <button id="delete-button" onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
