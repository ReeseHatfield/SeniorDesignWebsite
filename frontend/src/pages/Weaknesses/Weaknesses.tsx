import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import Video from "../../components/Video/Video";
import { useState, useEffect } from "react";

const backendPort = 3001;

const Weaknesses = () => {

  const navigate: NavigateFunction = useNavigate();
  const { state } = useLocation();
  const sessionID = state;
  const [images, setImages] = useState([]); // useState array scary

  useEffect(() => {
    if (sessionID === undefined) {
      alert("WARNING: UNAUTHORIZED USER, PLEASE LOG IN");
      navigate("/");
    }

    fetch('http://localhost:3001/images', {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "id": sessionID
      },
    })
    .then((response) => {
      if (response.status != 200) { // use this as session check
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
        // Fetch each image separately with headers including the sessionID
        return fetch(`http://${location.hostname}:${backendPort}${path}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "id": sessionID
          },
        })
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob)); // Create a local URL for the blob
      });
    
      Promise.all(imagePromises).then((blobUrls) => {
        setImages(blobUrls);
        console.log(blobUrls);
      });
    })
    
    .catch((error) => console.error('Error:', error));

  }, [sessionID, navigate]);

  return <>
    <Video youtubeLink="https://www.youtube.com/watch?v=F2sERCgDESE" />
    <h1>Weaknesses</h1>
    <div>
      {images.map((imagePath, index) => (
        <img key={index} src={imagePath} alt={`Weakness image ${index + 1}`} style={{ width: '200px', margin: '10px' }} />
      ))}
    </div>
  </>;
};

export default Weaknesses;
