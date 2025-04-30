from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Load models
rf_model = joblib.load("rf_model.pkl")
svm_model = joblib.load("svm_model.pkl")
cnn_model = load_model("cnn_model.h5")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        input_data = data["inputData"]
        model_type = data["modelType"]

        if len(input_data) != 5:
            return jsonify({"error": "Exactly 5 features are required."}), 400

        X = np.array(input_data).reshape(1, -1)

        if model_type == "rf":
            prediction = rf_model.predict(X)[0]
        elif model_type == "svm":
            prediction = svm_model.predict(X)[0]
        elif model_type == "cnn":
            prediction = cnn_model.predict(X)
            prediction = int(np.argmax(prediction))
        else:
            return jsonify({"error": "Invalid model type"}), 400

        return jsonify({"prediction": int(prediction)})
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == "__main__":
    app.run(debug=True)
