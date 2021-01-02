import React, { useState } from "react";
import PropTypes from "prop-types";
const AddBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddBlog = (event) => {
    event.preventDefault();
    onSubmit(author, title, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onSubmit={handleAddBlog} className="form">
      <div>
        Title
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        Author
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        URL
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button type="submit" id="addBlogSubmit">Add Blog</button>
    </form>
  );
};

AddBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default AddBlogForm;
