import React, { useState } from "react";
const Blog = ({ blog, onDelete, showDelete, onLike }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [newBlog, setNewBlog] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLike = async () => {
    try {
      const b = await onLike(newBlog);
      setNewBlog(b);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    window.confirm(
      `Are you sure you want to delete "${blog.title}" by ${blog.author}?`
    );
    onDelete(newBlog.id);
  };
  return (
    <div style={blogStyle}>
      {newBlog.title}{" "}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="showDetailsButton"
      >
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails ? (
        <div className="details">
          <p>{newBlog.author}</p>
          <div className="likes">
            Likes: {newBlog.likes}{" "}
            <button onClick={handleLike} className="likeButton">
              {" "}
              Like
            </button>
          </div>
          <p>{newBlog.url}</p>
          {showDelete ? <button onClick={handleDelete}>Delete</button> : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Blog;
