import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdoteVote(state, action) {
      console.log('action: ', JSON.parse(JSON.stringify(action)))

      const updatedAnecdote = action.payload

      return state.map(item => item.id === action.payload.id ? updatedAnecdote: item)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdote(state, action){
      return action.payload
    }
  }
})

export const initializeAncedotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteObject = {...anecdote, votes: anecdote.votes + 1}

    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdoteObject)
    dispatch(updateAnecdoteVote(updatedAnecdote))
  }
}

export const { updateAnecdoteVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export default anecdoteSlice.reducer
