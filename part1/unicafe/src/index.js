import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const Statistic = (props) => {
  return <tr><td>{props.text}</td><td>{props.value}</td></tr>
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = ((good / all) * 100).toString().concat("%")

  if(all>0){
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"></Button>    
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"></Button>   
      <Button handleClick={() => setBad(bad+1)} text="bad"></Button>   
      <h1>statistics</h1>

      <table>
        <tbody>
          <Statistic text="good" value={good}></Statistic>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="all" value={all}></Statistic>
          <Statistic text="average" value={average}></Statistic>
          <Statistic text="positive" value={positive}></Statistic>
        </tbody>
      </table>
    </div>
  )
  }
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"></Button>    
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"></Button>   
      <Button handleClick={() => setBad(bad+1)} text="bad"></Button>   
      <h1>Statistics</h1>
      <div>No feedback given</div>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
