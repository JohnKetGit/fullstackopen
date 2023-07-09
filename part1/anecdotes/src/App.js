import { useState } from 'react'

const Header = ({children}) => <h1>{children}</h1>

const ShowAnecdote = ({anecdote, counts}) => {
  return (
    <>
      {anecdote}
      <br/>
      Has {counts} votes
      <br/>
    </>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const RetrieveFavourite = ({anecdotes, counts}) => {
  let hightestCount = Math.max(...counts)
  let index = counts.indexOf(hightestCount)

  if (hightestCount === 0) {
    return (
      <p>There are no favorites.</p>
    )
  } else {
    return (
      <>
      {anecdotes[index]}
      <br/>
      Has {counts[index]} votes
      </>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  // create a zero-filled array of the desired length
  const [count, setCounts] = useState(Array.from(Array(anecdotes.length), () => 0))

  const retrieveRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVote = () => {
    // create a copy of count
    const vote = [...count]
    vote[selected] += 1
    setCounts(vote)
  }

  return (
    <div>
      <Header>Anecdote of the day</Header>
      <ShowAnecdote anecdote={anecdotes[selected]} counts={count[selected]}/>
      <Button handleClick={handleVote} text="Vote"/>
      <Button handleClick={retrieveRandomAnecdote} text="Next anecdote"/>

      <Header>Anecdote with the most votes</Header>
      <RetrieveFavourite anecdotes={anecdotes} counts={count}/>
    </div>
  )
}

export default App
