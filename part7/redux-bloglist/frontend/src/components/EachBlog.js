import { useDispatch, useSelector } from 'react-redux'

import { addLikes } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import BlogComment from './BlogComment'

const EachBlog = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const id = useParams().id

  const blog = blogs.find(n => n.id === String(id))

  if(!blog){
    return null
  }

  const handleLike = () => {
    dispatch(addLikes(blog))
    dispatch(setNotification([`You added one like for "${blog.title}"!`, 'success'], 5))
  }

  return (
    <div>
      <h2>{blog.title} written by {blog.author}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} <button onClick={handleLike}>likes</button>
      </p>
      <p>Added by {blog.user !== null && blog.user.name}</p>
      <BlogComment id={blog.id}/>
    </div>
  )
}

export default EachBlog