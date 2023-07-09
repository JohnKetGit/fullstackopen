import { useState } from 'react'

const Header = ({children}) => <h1>{children}</h1>

const StatisticLine = ({text, value, symbol}) => <>{text}{value}{symbol}</>

const Statistics = ({good, neutral, bad}) => {
  const overall = good + neutral + bad
  const average = (good - bad) / overall
  const positive = (good / overall) * 100

  if (overall === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="good"/></td>
            <td><StatisticLine value={good}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral"/></td>
            <td><StatisticLine value={neutral}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad"/></td>
            <td><StatisticLine value={bad}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="all"/></td>
            <td><StatisticLine value={overall}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="average"/></td>
            <td><StatisticLine value={average}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive"/></td>
            <td><StatisticLine value={positive} symbol="%"/></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header>give feedback</Header>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Header>statistics</Header>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
