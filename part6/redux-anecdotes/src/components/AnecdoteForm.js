import React from "react";
import { useDispatch, connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = (props) => {
  const newAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.addAnecdote(content);
    props.setNotification(`You created ${content}`, 5);
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
const mapDispatchToProps = { addAnecdote, setNotification };
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
