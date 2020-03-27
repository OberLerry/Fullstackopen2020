import React from 'react'
import ReactDOM from 'react-dom'



const Header = (props) => (
  <>
    <h1>{props.title}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.name} {props.exercises}</p>
  </>
)
const Content = (props) => (
  <>
    <Part name={props.parts[0]} exercises={props.exercises[0]} />
    <Part name={props.parts[1]} exercises={props.exercises[1]} />
    <Part name={props.parts[2]} exercises={props.exercises[2]} />
  </>
)

const Total = (props) => (
  <>
    <p>{props.text} {props.exercises}</p>
  </>
)
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const exercises = [exercises1, exercises2, exercises3]
  const parts = [part1, part2, part3]
  return (
    <div>
      <Header title={course} />
      <Content parts={parts} exercises={exercises} />
    
      <Total text="Number of exercises" exercises={exercises1 + exercises2 + exercises3}/> 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
