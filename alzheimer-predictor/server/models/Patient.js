const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  symptoms: [String],
  inputData: [Number]
});

module.exports = mongoose.model("Patient", patientSchema);
