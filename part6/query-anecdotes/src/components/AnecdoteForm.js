import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'displayNotification', payload: `Anecdote is too short, it must have a length of 5 or more.` })
      setTimeout(() => {
        dispatch({ type: 'clearNotification' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({content, votes: 0})

    dispatch({ type: 'displayNotification', payload: `Anecdote: ${content} has been added.` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
