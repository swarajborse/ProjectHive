import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sentiment_model import SentimentAnalyzer
import os

def create_sample_data():
    """Create sample training data if data file doesn't exist"""
    
    data = {
        'text': [
            # Positive examples
            "I absolutely love this product! It's amazing!",
            "Best purchase ever! Highly recommend!",
            "Fantastic quality and great service!",
            "This exceeded all my expectations!",
            "Wonderful experience, will buy again!",
            "Incredible! Simply the best!",
            "Outstanding product, very satisfied!",
            "Excellent quality, worth every penny!",
            "Amazing features, works perfectly!",
            "Superb! Couldn't be happier!",
            
            # Negative examples
            "Terrible product, complete waste of money",
            "Worst purchase I've ever made",
            "Horrible quality, very disappointed",
            "Don't buy this, it's awful",
            "Poor quality, broke after one use",
            "Completely useless, total garbage",
            "Disappointed and frustrated",
            "Not worth it, save your money",
            "Terrible experience, never again",
            "Bad quality, doesn't work",
            
            # Neutral examples
            "It's okay, nothing special",
            "Average product, does the job",
            "Decent but could be better",
            "It works as described",
            "Not bad, not great either",
            "Acceptable for the price",
            "Standard quality, no complaints",
            "Meets basic expectations",
            "Fair product, average quality",
            "It's fine, just okay",
            
            # More positive
            "Love it! Perfect for my needs!",
            "Great value for money!",
            "Impressive quality and design!",
            "Highly satisfied with this purchase!",
            "Brilliant! Works like a charm!",
            
            # More negative
            "Very poor quality, not recommended",
            "Waste of time and money",
            "Cheaply made, broke immediately",
            "Regret buying this",
            "Terrible service, bad product",
            
            # More neutral
            "It's alright, serves its purpose",
            "Neither good nor bad",
            "Standard product, average results",
            "Okay for the price point",
            "Neutral experience overall"
        ],
        'sentiment': (
            ['positive'] * 15 + 
            ['negative'] * 15 + 
            ['neutral'] * 15
        )
    }
    
    df = pd.DataFrame(data)
    
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Save to CSV
    df.to_csv('data/sample_data.csv', index=False)
    print(f"✅ Created sample dataset with {len(df)} examples")
    
    return df

def train_model():
    """Train the sentiment analysis model"""
    
    print("🚀 Starting model training...\n")
    
    # Load or create data
    data_path = 'data/sample_data.csv'
    if os.path.exists(data_path):
        print("📂 Loading existing dataset...")
        df = pd.read_csv(data_path)
    else:
        print("📝 Creating sample dataset...")
        df = create_sample_data()
    
    print(f"📊 Dataset size: {len(df)} samples")
    print(f"   - Positive: {len(df[df['sentiment'] == 'positive'])}")
    print(f"   - Negative: {len(df[df['sentiment'] == 'negative'])}")
    print(f"   - Neutral: {len(df[df['sentiment'] == 'neutral'])}\n")
    
    # Convert sentiment labels to numbers
    sentiment_map = {'negative': 0, 'neutral': 1, 'positive': 2}
    df['sentiment_num'] = df['sentiment'].map(sentiment_map)
    
    # Split data
    X = df['text'].values
    y = df['sentiment_num'].values
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"📊 Training set: {len(X_train)} samples")
    print(f"📊 Test set: {len(X_test)} samples\n")
    
    # Initialize and train model
    print("🤖 Training model...")
    analyzer = SentimentAnalyzer()
    analyzer.train(X_train, y_train)
    
    # Evaluate model
    print("\n📈 Evaluating model...\n")
    
    # Make predictions on test set
    y_pred = []
    for text in X_test:
        result = analyzer.predict(text)
        sentiment = result['sentiment']
        y_pred.append(sentiment_map[sentiment])
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    print(f"✅ Accuracy: {accuracy:.2%}\n")
    
    # Classification report
    target_names = ['Negative', 'Neutral', 'Positive']
    print("📊 Classification Report:")
    print(classification_report(y_test, y_pred, target_names=target_names))
    
    # Confusion matrix
    print("🔍 Confusion Matrix:")
    cm = confusion_matrix(y_test, y_pred)
    print(cm)
    print()
    
    # Save model
    os.makedirs('models', exist_ok=True)
    model_path = 'models/sentiment_model.pkl'
    analyzer.save_model(model_path)
    
    print(f"\n✅ Model training completed!")
    print(f"📁 Model saved to: {model_path}")
    
    # Test with example predictions
    print("\n🧪 Testing with examples:")
    test_texts = [
        "This is absolutely wonderful!",
        "Terrible experience, very bad",
        "It's okay, nothing special"
    ]
    
    for text in test_texts:
        result = analyzer.predict(text)
        print(f"\nText: '{text}'")
        print(f"Sentiment: {result['sentiment'].upper()} ({result['confidence']:.1f}% confidence)")

if __name__ == "__main__":
    train_model()
