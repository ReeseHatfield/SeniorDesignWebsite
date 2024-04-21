import { useState } from "react";
import { sha1 } from "crypto-hash";
import { useNavigate } from "react-router-dom";

const CORRECT_USERNAME = "Anakin";
const CORRECT_PASSWORD = `94fefd07be649475095c356f752f2abe75c8498b`;

const Login = () => {
  const navigate = useNavigate();

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

    const handleSubmit = (async (event: any) => {
      event.preventDefault(); // full submit override

      const hashed_pw = await sha1(password)

      if(!password || !username){
        alert("Username and Password must be filled out");
        return;
      }

      if(hashed_pw != CORRECT_PASSWORD){
        alert("Incorrect username or password");
        return;
      }

      if(username != CORRECT_USERNAME){
        alert("Incorrect username or password");
        return
      }

      alert("Welcom Anakin!");

      navigate("/weaknesses")
    
    }) 

  return (
    <>
      <h1>2024 Senior Design: Group 7</h1>
      <form onSubmit={handleSubmit}>
        {usernameField}
        {passwordField}
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
};

export default Login;
