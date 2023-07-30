import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === null) {
            return state.anecdotes
        }

        return state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        console.log('vote', anecdote.id)
    
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted for "${anecdote.content}".`, 10))
    }

    return (
        <div>
            {anecdotes.sort((a,b) => a.votes < b.votes ? 1 : -1).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
