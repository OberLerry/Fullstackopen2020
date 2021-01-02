import React from "react";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      Username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      ></input>
    </div>
    <div>
      Password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      ></input>
    </div>
    <button type="submit" id="submitLogin">
      Login
    </button>
  </form>
);

export default LoginForm;
