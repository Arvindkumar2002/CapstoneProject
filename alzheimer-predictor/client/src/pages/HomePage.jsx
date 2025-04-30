import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate("/auth");
  };

  return (
    <div>
      <h1>Welcome to Alzheimer Predictor</h1>
      <button onClick={goToAuth}>Login / Register</button>
    </div>
  );
};

export default HomePage;
