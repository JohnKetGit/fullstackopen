import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [blogObject, setBlogObject] = useState(blog)
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

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
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
          likes {blogObject.likes}{' '}
          <button id="like-button" onClick={addLike}>like</button>
        </p>
        <p>{blog.user.username}</p>
        <button id="delete-button" onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
