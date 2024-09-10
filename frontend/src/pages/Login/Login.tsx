import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Video from "../../components/Video/Video";

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

      if(!password || !username){
        alert("Username and Password must be filled out");
        return;
      }

      fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then((response) => {
          if(response.status != 200){
            alert("Incorrect Login");
            return null
          }
          return response.json()
        })
        .then((data) => {
          if (data != null) {
            const sessionID = data["id"];

            alert("Sucess: session ID is " + sessionID);

            console.log("The response is", data); 
            navigate("/weaknesses", { state: sessionID});
          }
        })
        .catch((error) => console.error('Error:', error));


    
    }) 

  return (
    <>
      <h1>2024 Senior Design: Group 7</h1>
      <Video youtubeLink="https://www.youtube.com/watch?v=zGwszApFEcY"/>
      <form onSubmit={handleSubmit}>
        {usernameField}
        {passwordField}
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
};

export default Login;
