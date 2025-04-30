import React, { useState } from "react";
import axios from "axios";

const PredictionPage = () => {
  const [inputData, setInputData] = useState(["", "", "", "", ""]);
  const [modelType, setModelType] = useState("rf");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Updated feature labels and valid ranges
  const featureLabels = [
    { label: "Age (50-100)", min: 50, max: 100 },
    { label: "Gender (0 = Male, 1 = Female)", min: 0, max: 1 },
    { label: "BMI (10-50)", min: 10, max: 50 },
    { label: "MMSE Score (0-30)", min: 0, max: 30 },
    { label: "ADL Score (0-100)", min: 0, max: 100 }
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
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Alzheimer's Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        {featureLabels.map((feature, idx) => (
          <div key={idx}>
            <label>
              {feature.label}:{" "}
              <input
                type="number"
                value={inputData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                min={feature.min}
                max={feature.max}
                required
              />
            </label>
          </div>
        ))}

        <div>
          <label>Select Model: </label>
          <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
            <option value="rf">Random Forest</option>
            <option value="svm">SVM</option>
            <option value="cnn">CNN</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
          Prediction Result: {result}
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
