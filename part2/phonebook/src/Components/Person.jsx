import React from 'react'

const Person = (props) => {
    //console.log(props)
    return (
        <li>{props.name} {props.number}
        <button onClick={() => props.deleteHandler(props.id)}>Remove</button>
        </li>)
}

export default Person