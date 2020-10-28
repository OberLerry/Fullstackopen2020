import React from 'react';


const Course = ({course}) => {
  return(
    <>
      <h1>{course.name}</h1>
      {course.parts.map(part => 
      <Part key={part.id} part={part} />
      )}
      <Total parts={course.parts}></Total>
    </>
  )
}


const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return(
    <p><b>Total of {total} exercises</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}


export default Course