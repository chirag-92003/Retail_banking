from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

# Load the trained model (could be a pipeline with preprocessing)
model = joblib.load('term_deposit_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    try:
        input_data = pd.DataFrame([{
            'age': int(data['age']),
            'job': data['job'],
            'marital': data['marital'],
            'education': data['education'],
            'default': data['default'],
            'balance': int(data['balance']),
            'housing': data['housing'],
            'loan': data['loan'],
            'contact': data['contact'],
            'day': int(data['day']),
            'month': data['month'],
            'duration': int(data['duration']),
            'campaign': int(data['campaign']),
            'pdays': int(data['pdays']),
            'previous': int(data['previous']),
            'poutcome': data['poutcome'],
        }])

        prediction = model.predict(input_data)[0]
        result = 'Yes' if prediction == 1 else 'No'

        return jsonify({'prediction': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
