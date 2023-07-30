import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()

        dispatch(createAnecdote(event.target.anecdote.value))
        dispatch(setNotification(`You added "${event.target.anecdote.value}".`, 10))

        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input type='text' name='anecdote' required/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
