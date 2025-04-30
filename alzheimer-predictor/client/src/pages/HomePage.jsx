import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🧠 Alzheimer's Disease Predictor</h1>
        <p style={styles.description}>
          Welcome! Use this tool to assess the likelihood of Alzheimer's based on clinical input data.
        </p>
        <Link to="/predict">
          <button style={styles.button}>Start Prediction</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "500px"
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.8rem",
    color: "#2c3e50"
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "2rem"
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer"
  }
};

export default HomePage;
