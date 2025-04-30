import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        username,
        password,
      });
      setMessage(response.data.message);
      navigate("/predict");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", {
        username,
        password,
      });
      setMessage(response.data.message);
      navigate("/predict");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login or Register</h2>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.buttonGroup}>
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
          <button onClick={handleRegister} style={{ ...styles.button, backgroundColor: "#6a1b9a" }}>
            Register
          </button>
        </div>
        {message && (
          <div style={styles.messageBox}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  button: {
    flex: 1,
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  messageBox: {
    marginTop: "1rem",
    color: "#333",
    fontSize: "0.95rem",
  },
};

export default AuthPage;
