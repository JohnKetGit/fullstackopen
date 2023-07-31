import { useQueryClient, useMutation } from 'react-query'
import { createBlog } from '../request'
import { useNotificationDispatch } from '../notificationContext'

const BlogForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: () => {
      dispatch({ type: 'displayNotification', payload: 'Error while trying to create the blog!' })

      setTimeout(() => {
        dispatch({ type: 'clearNotification' })
      }, 5000)
    }
  })

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate({ title, author, url })

    dispatch({ type: 'displayNotification', payload: `A new blog: ${title} by ${author} has been added.` })

    setTimeout(() => {
      dispatch({ type: 'clearNotification' })
    }, 5000)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>

      <div>
            title:{' '}
        <input
          id="title"
          type="text"
          name="Title"
        />
      </div>

      <div>
            author:{' '}
        <input
          id="author"
          type="text"
          name="Author"
        />
      </div>

      <div>
            url:{' '}
        <input
          id="url"
          type="url"
          name="Url"
        />
      </div>

      <br />

      <button id="create-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm
