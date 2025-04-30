import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", age: "", gender: "", symptoms: "", inputData: "", modelType: "rf"
  });
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/predict", {
      ...formData,
      symptoms: formData.symptoms.split(","),
      inputData: formData.inputData.split(",").map(Number)
    });
    setPrediction(response.data.prediction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Age" type="number" onChange={e => setFormData({ ...formData, age: e.target.value })} />
      <input placeholder="Gender" onChange={e => setFormData({ ...formData, gender: e.target.value })} />
      <input placeholder="Symptoms" onChange={e => setFormData({ ...formData, symptoms: e.target.value })} />
      <input placeholder="Input Data" onChange={e => setFormData({ ...formData, inputData: e.target.value })} />
      <select onChange={e => setFormData({ ...formData, modelType: e.target.value })}>
        <option value="rf">Random Forest</option>
        <option value="svm">SVM</option>
        <option value="cnn">CNN</option>
      </select>
      <button type="submit">Predict</button>
      {prediction !== null && <p>Prediction: {prediction ? "Alzheimer's" : "Healthy"}</p>}
    </form>
  );
}
