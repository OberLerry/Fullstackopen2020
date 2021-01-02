import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const credentialsJSON = window.localStorage.getItem("Credentials");
    if (credentialsJSON) {
      const user = JSON.parse(credentialsJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);
  useEffect(() => {
    const tmp = async () => {
      await blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    };
    tmp();
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("Credentials", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setInfoMessage("Login failed due to wrong credentials");
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
    }
  };
  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      setInfoMessage("Successfully removed blog");
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("Credentials");
    blogService.setToken(null);
    setUser(null);
  };

  const handleLike = async (blog) => {
    try {
      const b = await blogService.likeBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(
        blogs.map((a) => (a !== blog ? a : b)).sort((a, b) => b.likes - a.likes)
      );
      return b;
    } catch (e) {
      console.log(e.message);
    }
  };
  const addBlog = async (author, title, url) => {
    try {
      console.log(author, title, url);
      const newBlog = await blogService.addBlog(title, author, url);
      setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes));
      setInfoMessage(`Successfully added Blog ${title}`);
    } catch (e) {
      console.log(e.message);
      setInfoMessage("Failed to add Blog ", e.message);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={infoMessage}></Notification>
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        ></LoginForm>
      ) : (
        <div>
          {" "}
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="New Blog" backButtonLabel="Cancel">
            <AddBlogForm onSubmit={addBlog}></AddBlogForm>
          </Togglable>
        </div>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onDelete={deleteBlog}
          showDelete={user && blog.user && blog.user.username === user.username}
          onLike={handleLike}
        />
      ))}
    </div>
  );
};

export default App;
