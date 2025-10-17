from flask import Flask, render_template, request, jsonify
import joblib
import os
from sentiment_model import SentimentAnalyzer

app = Flask(__name__)

# Initialize sentiment analyzer
analyzer = SentimentAnalyzer()

# Load trained model if exists
model_path = 'models/sentiment_model.pkl'
if os.path.exists(model_path):
    analyzer.load_model(model_path)
    print("✅ Model loaded successfully!")
else:
    print("⚠️  No trained model found. Please run train_model.py first.")

@app.route('/')
def home():
    """Render the main page"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Predict sentiment for given text"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Get prediction
        result = analyzer.predict(text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/batch-predict', methods=['POST'])
def batch_predict():
    """Predict sentiment for multiple texts"""
    try:
        data = request.get_json()
        texts = data.get('texts', [])
        
        if not texts:
            return jsonify({'error': 'No texts provided'}), 400
        
        results = []
        for text in texts:
            result = analyzer.predict(text)
            result['text'] = text[:50] + '...' if len(text) > 50 else text
            results.append(result)
        
        return jsonify({'results': results})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    try:
        info = analyzer.get_model_info()
        return jsonify(info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
