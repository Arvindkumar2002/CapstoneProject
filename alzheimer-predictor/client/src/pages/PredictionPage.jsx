import React, { useState } from "react";
import axios from "axios";

const PredictionPage = () => {
  const [inputData, setInputData] = useState(["", "", "", "", ""]);
  const [modelType, setModelType] = useState("rf");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const featureLabels = [
    { label: "Age (50-100)", min: 50, max: 100 },
    { label: "Gender (0 = Male, 1 = Female)", min: 0, max: 1 },
    { label: "BMI (10-50)", min: 10, max: 50 },
    { label: "MMSE Score (0-30)", min: 0, max: 30 },
    { label: "ADL Score (0-100)", min: 0, max: 100 },
  ];

  const handleChange = (index, value) => {
    const newData = [...inputData];
    newData[index] = value;
    setInputData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = inputData.map(Number);
    if (values.some(isNaN)) {
      alert("All fields must be filled with numbers");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        inputData: values,
        modelType,
      });
      setResult(res.data.prediction === 1 ? "Alzheimer's Detected" : "No Alzheimer's Detected");
    } catch (error) {
      console.error(error);
      setResult("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧠 Alzheimer's Disease Prediction</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {featureLabels.map((feature, idx) => (
            <div key={idx} style={styles.inputGroup}>
              <label style={styles.label}>{feature.label}</label>
              <input
                type="number"
                value={inputData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                min={feature.min}
                max={feature.max}
                required
                style={styles.input}
              />
            </div>
          ))}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Model:</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              style={styles.select}
            >
              <option value="rf">Random Forest</option>
              <option value="svm">SVM</option>
              <option value="cnn">CNN</option>
            </select>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: "1.5rem" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: result.includes("No") ? "#4CAF50" : "#e53935",
              }}
            >
              Prediction Result: {result}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
};

export default PredictionPage;
