import { useNavigate } from "react-router-dom";

const Weaknesses = () => {

  const navigate = useNavigate();

  if(localStorage.getItem("authed") != "true"){
    alert("UNAUTHORIZED USER");
    navigate("/");
    return;
  }

  return <div>Weaknesses</div>;
};

export default Weaknesses;
