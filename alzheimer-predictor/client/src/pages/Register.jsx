import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    inputData: "",
    modelType: "rf",
  });

  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        ...formData,
        symptoms: formData.symptoms.split(","),
        inputData: formData.inputData.split(",").map(Number),
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error(err);
      setPrediction("Prediction failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Register & Predict</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Name"
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            placeholder="Age"
            type="number"
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
          <input
            placeholder="Gender (0 = Male, 1 = Female)"
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          />
          <input
            placeholder="Symptoms (comma-separated)"
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            required
          />
          <input
            placeholder="Input Data (comma-separated numbers)"
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, inputData: e.target.value })}
            required
          />

          <select
            style={styles.select}
            onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
          >
            <option value="rf">Random Forest</option>
            <option value="svm">SVM</option>
            <option value="cnn">CNN</option>
          </select>

          <button type="submit" style={styles.button}>
            Predict
          </button>
        </form>

        {prediction !== null && (
          <div style={styles.result}>
            <strong>Prediction:</strong>{" "}
            <span style={{ color: prediction ? "#e53935" : "#4CAF50" }}>
              {prediction === "Prediction failed"
                ? prediction
                : prediction
                ? "Alzheimer's"
                : "Healthy"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  select: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  result: {
    marginTop: "1.5rem",
    fontSize: "1.1rem",
    textAlign: "center",
  },
};
