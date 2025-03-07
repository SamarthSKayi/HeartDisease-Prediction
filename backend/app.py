from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load the trained model
model = joblib.load('heart_disease_model.pkl')

# Define expected feature names
expected_features = [
    "Age", "Sex", "Chest pain type", "BP", "Cholesterol",
    "FBS over 120", "EKG results", "Max HR", "Exercise angina",
    "ST depression", "Slope of ST", "Number of vessels fluro", "Thallium"
]

# Define API route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received Data:", data)  # Debugging

        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Ensure all required fields are present
        missing_fields = [field for field in expected_features if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Convert input data to match model expectations
        try:
            corrected_data = {key: float(value) for key, value in data.items()}  # Convert to float/int
        except ValueError as e:
            return jsonify({"error": f"Invalid data type: {str(e)}"}), 400

        # Convert to DataFrame
        input_data = pd.DataFrame([corrected_data])

        # Ensure DataFrame columns match the model's expected feature order
        input_data = input_data[expected_features]

        # Make prediction
        prediction = model.predict(input_data)[0]
        result = "Disease Present" if prediction == 1 else "No Disease"

        return jsonify({"prediction": result})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
