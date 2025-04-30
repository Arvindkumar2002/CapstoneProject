import React, { useState } from 'react';
import axios from 'axios';

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    memory_loss: '',
    mri_score: '',
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData); // Flask API endpoint
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction('Error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age: </label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Memory Loss Severity (1-10): </label>
          <input type="number" name="memory_loss" value={formData.memory_loss} onChange={handleChange} required />
        </div>
        <div>
          <label>MRI Score (0-1): </label>
          <input type="number" step="0.01" name="mri_score" value={formData.mri_score} onChange={handleChange} required />
        </div>
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div style={{ marginTop: 20 }}>
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
};

export default PredictorForm;
