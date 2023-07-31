import { useSelector } from 'react-redux'
import AddCommentForm from './AddCommentForm'

const BlogComment = ({ id }) => {
  const comments = useSelector(state => state.comments)

  return(
    <div>
      <h3>Comments</h3>

      <AddCommentForm id={id}/>

      {comments.filter((comment) => comment.blogs === id).map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </div>
  )
}

export default BlogComment