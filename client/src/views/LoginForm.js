import React from "react";

const LoginForm = () => {
  return (
    <div>
      <h1>Please log in</h1>
      <form action="/auth/login" method="POST">
        <label htmlFor="username">Username</label>
        <input name="username" placeholder="username" type="text" />
        <br />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
