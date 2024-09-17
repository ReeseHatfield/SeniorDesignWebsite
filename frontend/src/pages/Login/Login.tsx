import { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "/firstPart.mp4"

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pat, setPat] = useState("");

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

  

  const patField = (
    <input type="file" onChange={(event) => {
      if (!event.target.files) return;

      const file = event.target.files[0];

      const fr = new FileReader(); // clientside file reading is gross
      
      fr.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setPat(e.target.result);
        }
      }

      fr.readAsText(file);

    }}
    ></input>
  )


    const handleSubmit = (async (event: any) => {
      event.preventDefault(); // full submit override

      if(!password || !username){
        alert("Username and Password must be filled out");
        return;
      }

      fetch('/api/auth', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          pat: pat
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
      <video width="750" height="500" controls >
        <source src={video} type="video/mp4"/>
      </video>
      <form onSubmit={handleSubmit}>
        {patField}
        {usernameField}
        {passwordField}
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
};

export default Login;
