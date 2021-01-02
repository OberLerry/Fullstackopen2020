import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
    dispatch(setNotification(`You created ${content}`, 10));
  };

  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={newAnecdote}>
        <input name="anecdote"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
