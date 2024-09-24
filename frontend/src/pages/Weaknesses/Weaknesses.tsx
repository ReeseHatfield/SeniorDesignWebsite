import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import video from "/secondPart.mp4"
import { useState, useEffect } from "react";


const backendPort = 8443;

const Weaknesses = () => {

  const navigate: NavigateFunction = useNavigate();
  const { state } = useLocation();
  const sessionID = state;
  const [images, setImages] = useState<Array<string>>([]); // useState array scary

  useEffect(() => {
    if (sessionID === undefined) {
      alert("WARNING: UNAUTHORIZED USER, PLEASE LOG IN");
      navigate("/");
    }

    fetch('/api/images/', {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "id": sessionID
      },
    })
    .then((response) => {
      if (!response.ok) { // use this as session check
        // alert -> nav feels bad, but works fine for this
        alert("Incorrect Login");
        navigate("/");
      }
      return response.json()
    })
    // .then((data) => {
    //   const fullPaths = data["message"].map((path: string) => {
    //     return `http://${location.hostname}:${backendPort}${path}`;
    //   });

    //   setImages(fullPaths); 
    //   console.log(fullPaths);
    // })
    .then((data) => {
      const imagePromises = data["message"].map((path: string) => {

        console.log(`Im about to fetch https://${location.hostname}:${backendPort}/api${path}`)


        return fetch(`https://${location.hostname}:${backendPort}/api${path}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "id": sessionID
          },
        })
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob)); 
      });
    
      Promise.all(imagePromises).then((blobUrls: any[]) => {
        setImages(blobUrls);
        console.log(blobUrls);
      });
    })
    
    .catch((error) => console.error('Error:', error));

  }, [sessionID, navigate]);

  return <>
      <video width="750" height="500" controls >
        <source src={video} type="video/mp4"/>
      </video>
    <h1>Weaknesses</h1>
    <div>
      {images.map((imagePath, index) => (
        <img key={index} src={imagePath} alt={`Weakness image ${index + 1}`} style={{ width: '200px', margin: '10px' }} />
      ))}
    </div>
  </>;
};

export default Weaknesses;
