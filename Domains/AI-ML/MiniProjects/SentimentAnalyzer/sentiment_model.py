import nltk
import re
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

class SentimentAnalyzer:
    def __init__(self):
        self.model = None
        self.sentiment_labels = {
            0: 'negative',
            1: 'neutral',
            2: 'positive'
        }
        
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
    
    def preprocess_text(self, text):
        """
        Preprocess text for sentiment analysis
        
        Args:
            text (str): Input text
        
        Returns:
            str: Cleaned text
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text)
        
        # Remove user mentions and hashtags
        text = re.sub(r'@\w+|#\w+', '', text)
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word not in stop_words]
        
        # Join tokens back
        clean_text = ' '.join(tokens)
        
        return clean_text
    
    def train(self, X_train, y_train):
        """
        Train the sentiment analysis model
        
        Args:
            X_train: Training texts
            y_train: Training labels
        """
        # Create pipeline
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(
                max_features=5000,
                ngram_range=(1, 2),
                min_df=2,
                max_df=0.8
            )),
            ('classifier', MultinomialNB(alpha=0.1))
        ])
        
        # Preprocess training data
        X_train_clean = [self.preprocess_text(text) for text in X_train]
        
        # Train model
        self.model.fit(X_train_clean, y_train)
        
        print("✅ Model trained successfully!")
    
    def predict(self, text):
        """
        Predict sentiment for given text
        
        Args:
            text (str): Input text
        
        Returns:
            dict: Prediction results
        """
        if self.model is None:
            raise Exception("Model not trained or loaded!")
        
        # Preprocess text
        clean_text = self.preprocess_text(text)
        
        # Get prediction
        prediction = self.model.predict([clean_text])[0]
        probabilities = self.model.predict_proba([clean_text])[0]
        
        # Get sentiment label
        sentiment = self.sentiment_labels[prediction]
        
        # Calculate confidence
        confidence = float(max(probabilities) * 100)
        
        return {
            'sentiment': sentiment,
            'confidence': round(confidence, 2),
            'probabilities': {
                'negative': round(float(probabilities[0] * 100), 2),
                'neutral': round(float(probabilities[1] * 100), 2),
                'positive': round(float(probabilities[2] * 100), 2)
            }
        }
    
    def save_model(self, filepath):
        """Save trained model to file"""
        if self.model is None:
            raise Exception("No model to save!")
        
        joblib.dump(self.model, filepath)
        print(f"✅ Model saved to {filepath}")
    
    def load_model(self, filepath):
        """Load trained model from file"""
        self.model = joblib.load(filepath)
        print(f"✅ Model loaded from {filepath}")
    
    def get_model_info(self):
        """Get information about the model"""
        if self.model is None:
            return {'error': 'No model loaded'}
        
        return {
            'model_type': 'Naive Bayes with TF-IDF',
            'features': self.model.named_steps['tfidf'].max_features,
            'sentiment_classes': list(self.sentiment_labels.values()),
            'preprocessing': [
                'Lowercase conversion',
                'URL removal',
                'Special character removal',
                'Stopword removal',
                'Tokenization'
            ]
        }

# Example usage
if __name__ == "__main__":
    analyzer = SentimentAnalyzer()
    
    # Test preprocessing
    sample_text = "This is AMAZING!!! I absolutely LOVE it! 😊 #happy"
    cleaned = analyzer.preprocess_text(sample_text)
    print(f"Original: {sample_text}")
    print(f"Cleaned: {cleaned}")
