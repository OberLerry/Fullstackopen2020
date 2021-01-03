import React from "react";
import { connect } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    props.voteAction(anecdote);
    props.setNotification(`You voted for ${anecdote.content}`, 5);
  };
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === "") {
    return { anecdotes: state.anecdotes };
  } else {
    return {
      anecdotes: state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
    };
  }
};
const mapDispatchToProps = { voteAction, setNotification };
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
