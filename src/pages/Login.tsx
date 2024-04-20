import { useState } from "react";

// import React from "react";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameField = (
    <input
      type="text"
      name="Username"
      value={username}
      onChange={(event) => {
        setUsername(event.target.value);
      }}
    ></input>
  );

  const passwordField = (
    <input 
    type="password" 
    name="Password:"
    value={password}
    onChange={(event) => {
      setPassword(event.target.value);
    }}
    ></input>);

  return (
    <form>
      {usernameField}
      {passwordField}
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default Login;
