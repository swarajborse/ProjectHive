"""
LSTM Model architecture for Stock Price Prediction
Defines the neural network model and training functions
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
import numpy as np
import os
from config import MODEL_CONFIG, PATHS


class StockPredictionModel:
    """Class to handle LSTM model creation and training"""
    
    def __init__(self, sequence_length=60, n_features=1):
        """
        Initialize the model
        
        Args:
            sequence_length (int): Number of time steps to look back
            n_features (int): Number of features per time step
        """
        self.sequence_length = sequence_length
        self.n_features = n_features
        self.model = None
        self.history = None
        
    def build_model(self):
        """
        Build the LSTM model architecture
        
        Returns:
            keras.Model: Compiled LSTM model
        """
        model = Sequential([
            # First LSTM layer with return sequences
            LSTM(
                units=MODEL_CONFIG['lstm_units'][0],
                return_sequences=True,
                input_shape=(self.sequence_length, self.n_features)
            ),
            Dropout(MODEL_CONFIG['dropout_rate']),
            
            # Second LSTM layer
            LSTM(
                units=MODEL_CONFIG['lstm_units'][1],
                return_sequences=True
            ),
            Dropout(MODEL_CONFIG['dropout_rate']),
            
            # Third LSTM layer
            LSTM(
                units=MODEL_CONFIG['lstm_units'][2],
                return_sequences=False
            ),
            Dropout(MODEL_CONFIG['dropout_rate']),
            
            # Dense layers
            Dense(units=25, activation='relu'),
            Dense(units=1)  # Output layer
        ])
        
        # Compile the model
        model.compile(
            optimizer=Adam(learning_rate=MODEL_CONFIG['learning_rate']),
            loss='mean_squared_error',
            metrics=['mae', 'mse']
        )
        
        self.model = model
        print("✅ Model built successfully!")
        print(f"\nModel Summary:")
        model.summary()
        
        return model
    
    def train(self, X_train, y_train, X_val=None, y_val=None):
        """
        Train the LSTM model
        
        Args:
            X_train (np.array): Training features
            y_train (np.array): Training labels
            X_val (np.array): Validation features (optional)
            y_val (np.array): Validation labels (optional)
            
        Returns:
            keras.callbacks.History: Training history
        """
        if self.model is None:
            self.build_model()
        
        # Create callbacks
        callbacks = self._create_callbacks()
        
        # If validation data not provided, use validation_split
        if X_val is None or y_val is None:
            validation_data = None
            validation_split = MODEL_CONFIG['validation_split']
        else:
            validation_data = (X_val, y_val)
            validation_split = 0
        
        print("\n🚀 Starting training...")
        print(f"Epochs: {MODEL_CONFIG['epochs']}")
        print(f"Batch size: {MODEL_CONFIG['batch_size']}")
        
        # Train the model
        self.history = self.model.fit(
            X_train, y_train,
            epochs=MODEL_CONFIG['epochs'],
            batch_size=MODEL_CONFIG['batch_size'],
            validation_data=validation_data,
            validation_split=validation_split,
            callbacks=callbacks,
            verbose=1
        )
        
        print("\n✅ Training complete!")
        return self.history
    
    def _create_callbacks(self):
        """
        Create training callbacks
        
        Returns:
            list: List of Keras callbacks
        """
        os.makedirs(PATHS['models_dir'], exist_ok=True)
        
        callbacks = [
            # Early stopping to prevent overfitting
            EarlyStopping(
                monitor='val_loss',
                patience=10,
                restore_best_weights=True,
                verbose=1
            ),
            
            # Save best model
            ModelCheckpoint(
                filepath=os.path.join(PATHS['models_dir'], 'best_model.h5'),
                monitor='val_loss',
                save_best_only=True,
                verbose=1
            ),
            
            # Reduce learning rate on plateau
            ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.5,
                patience=5,
                min_lr=1e-7,
                verbose=1
            )
        ]
        
        return callbacks
    
    def predict(self, X):
        """
        Make predictions using the trained model
        
        Args:
            X (np.array): Input features
            
        Returns:
            np.array: Predictions
        """
        if self.model is None:
            raise ValueError("Model not built or loaded")
        
        predictions = self.model.predict(X)
        return predictions
    
    def predict_future(self, last_sequence, scaler, days=30):
        """
        Predict future stock prices
        
        Args:
            last_sequence (np.array): Last N days of data
            scaler: MinMaxScaler used for normalization
            days (int): Number of days to predict
            
        Returns:
            np.array: Future price predictions
        """
        if self.model is None:
            raise ValueError("Model not built or loaded")
        
        # Reshape last sequence
        current_sequence = last_sequence.reshape((1, self.sequence_length, 1))
        predictions = []
        
        print(f"\n📈 Predicting next {days} days...")
        
        for i in range(days):
            # Predict next value
            next_pred = self.model.predict(current_sequence, verbose=0)
            predictions.append(next_pred[0, 0])
            
            # Update sequence with new prediction
            current_sequence = np.append(
                current_sequence[:, 1:, :],
                next_pred.reshape(1, 1, 1),
                axis=1
            )
        
        # Inverse transform to get actual prices
        predictions = np.array(predictions).reshape(-1, 1)
        predictions = scaler.inverse_transform(predictions)
        
        print("✅ Predictions complete!")
        return predictions
    
    def evaluate(self, X_test, y_test):
        """
        Evaluate model performance
        
        Args:
            X_test (np.array): Test features
            y_test (np.array): Test labels
            
        Returns:
            dict: Evaluation metrics
        """
        if self.model is None:
            raise ValueError("Model not built or loaded")
        
        print("\n📊 Evaluating model...")
        
        # Get predictions
        predictions = self.model.predict(X_test)
        
        # Calculate metrics
        mse = np.mean((predictions.flatten() - y_test) ** 2)
        rmse = np.sqrt(mse)
        mae = np.mean(np.abs(predictions.flatten() - y_test))
        mape = np.mean(np.abs((y_test - predictions.flatten()) / y_test)) * 100
        
        metrics = {
            'mse': mse,
            'rmse': rmse,
            'mae': mae,
            'mape': mape
        }
        
        print(f"\nModel Performance:")
        print(f"  MSE:  {mse:.6f}")
        print(f"  RMSE: {rmse:.6f}")
        print(f"  MAE:  {mae:.6f}")
        print(f"  MAPE: {mape:.2f}%")
        
        return metrics
    
    def save_model(self, filename='lstm_stock_model.h5'):
        """
        Save the trained model
        
        Args:
            filename (str): Model filename
        """
        if self.model is None:
            raise ValueError("No model to save")
        
        filepath = os.path.join(PATHS['models_dir'], filename)
        os.makedirs(PATHS['models_dir'], exist_ok=True)
        
        self.model.save(filepath)
        print(f"✅ Model saved to {filepath}")
    
    def load_model(self, filename='lstm_stock_model.h5'):
        """
        Load a trained model
        
        Args:
            filename (str): Model filename
        """
        filepath = os.path.join(PATHS['models_dir'], filename)
        
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Model file not found: {filepath}")
        
        self.model = load_model(filepath)
        print(f"✅ Model loaded from {filepath}")
        return self.model
    
    def get_training_history(self):
        """
        Get training history for visualization
        
        Returns:
            dict: Training history
        """
        if self.history is None:
            return None
        
        return {
            'loss': self.history.history['loss'],
            'val_loss': self.history.history['val_loss'],
            'mae': self.history.history['mae'],
            'val_mae': self.history.history['val_mae']
        }


def create_ensemble_model(num_models=3, sequence_length=60):
    """
    Create an ensemble of LSTM models for better predictions
    
    Args:
        num_models (int): Number of models in ensemble
        sequence_length (int): Sequence length for models
        
    Returns:
        list: List of StockPredictionModel instances
    """
    models = []
    
    for i in range(num_models):
        print(f"\n🔧 Building model {i+1}/{num_models}...")
        model = StockPredictionModel(sequence_length=sequence_length)
        model.build_model()
        models.append(model)
    
    return models


if __name__ == "__main__":
    # Example usage
    print("🧠 Stock Prediction LSTM Model")
    print("=" * 50)
    
    # Create model
    model = StockPredictionModel(sequence_length=60)
    
    # Build model
    model.build_model()
    
    # Create dummy data for testing
    X_train = np.random.rand(1000, 60, 1)
    y_train = np.random.rand(1000)
    X_test = np.random.rand(200, 60, 1)
    y_test = np.random.rand(200)
    
    print("\n📝 Note: Using dummy data for demonstration")
    print(f"X_train shape: {X_train.shape}")
    print(f"y_train shape: {y_train.shape}")
    
    # Train model (with reduced epochs for demo)
    MODEL_CONFIG['epochs'] = 5
    history = model.train(X_train, y_train, X_test, y_test)
    
    # Evaluate
    metrics = model.evaluate(X_test, y_test)
    
    # Save model
    model.save_model('test_model.h5')
    
    print("\n✅ Model demonstration complete!")

