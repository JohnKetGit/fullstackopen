import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link style={{ textDecoration: 'none' }} to={`/blogs/${blog.id}`}>{blog.title} written by {blog.author}</Link>
      </div>
    </div>
  )
}

export default Blog
