"""
Data loading and preprocessing module for Stock Price Prediction
Handles downloading stock data and preparing it for the LSTM model
"""

import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib
import os
from datetime import datetime, timedelta
from config import DATA_CONFIG, PATHS, INDICATORS_CONFIG


class StockDataLoader:
    """Class to handle stock data loading and preprocessing"""
    
    def __init__(self, ticker, period='5y'):
        """
        Initialize data loader
        
        Args:
            ticker (str): Stock ticker symbol (e.g., 'AAPL')
            period (str): Historical data period ('1y', '2y', '5y', 'max')
        """
        self.ticker = ticker.upper()
        self.period = period
        self.data = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        
    def fetch_data(self):
        """
        Fetch historical stock data from Yahoo Finance
        
        Returns:
            pd.DataFrame: Historical stock data
        """
        try:
            print(f"Fetching data for {self.ticker}...")
            stock = yf.Ticker(self.ticker)
            self.data = stock.history(period=self.period)
            
            if self.data.empty:
                raise ValueError(f"No data found for ticker {self.ticker}")
            
            print(f"Successfully fetched {len(self.data)} data points")
            return self.data
            
        except Exception as e:
            print(f"Error fetching data: {str(e)}")
            raise
    
    def calculate_technical_indicators(self):
        """
        Calculate technical indicators for the stock data
        
        Returns:
            pd.DataFrame: Data with technical indicators added
        """
        if self.data is None:
            raise ValueError("No data available. Call fetch_data() first.")
        
        df = self.data.copy()
        
        # Moving Averages
        for period in INDICATORS_CONFIG['ma_periods']:
            df[f'MA_{period}'] = df['Close'].rolling(window=period).mean()
        
        # RSI (Relative Strength Index)
        delta = df['Close'].diff()
        gain = delta.where(delta > 0, 0).rolling(
            window=INDICATORS_CONFIG['rsi_period']
        ).mean()
        loss = -delta.where(delta < 0, 0).rolling(
            window=INDICATORS_CONFIG['rsi_period']
        ).mean()
        rs = gain / loss
        df['RSI'] = 100 - (100 / (1 + rs))
        
        # MACD (Moving Average Convergence Divergence)
        exp1 = df['Close'].ewm(
            span=INDICATORS_CONFIG['macd_fast'], adjust=False
        ).mean()
        exp2 = df['Close'].ewm(
            span=INDICATORS_CONFIG['macd_slow'], adjust=False
        ).mean()
        df['MACD'] = exp1 - exp2
        df['Signal'] = df['MACD'].ewm(
            span=INDICATORS_CONFIG['macd_signal'], adjust=False
        ).mean()
        
        # Bollinger Bands
        bb_period = INDICATORS_CONFIG['bollinger_period']
        bb_std = INDICATORS_CONFIG['bollinger_std']
        df['BB_Middle'] = df['Close'].rolling(window=bb_period).mean()
        df['BB_Upper'] = df['BB_Middle'] + (
            df['Close'].rolling(window=bb_period).std() * bb_std
        )
        df['BB_Lower'] = df['BB_Middle'] - (
            df['Close'].rolling(window=bb_period).std() * bb_std
        )
        
        # Volume indicators
        df['Volume_MA_20'] = df['Volume'].rolling(window=20).mean()
        
        self.data = df
        return df
    
    def prepare_sequences(self, sequence_length=60):
        """
        Prepare data sequences for LSTM training
        
        Args:
            sequence_length (int): Number of time steps to look back
            
        Returns:
            tuple: (X_train, y_train, X_test, y_test, scaler)
        """
        if self.data is None:
            raise ValueError("No data available. Call fetch_data() first.")
        
        # Extract close prices
        close_prices = self.data['Close'].values.reshape(-1, 1)
        
        # Scale the data
        scaled_data = self.scaler.fit_transform(close_prices)
        
        # Create sequences
        X, y = [], []
        for i in range(sequence_length, len(scaled_data)):
            X.append(scaled_data[i-sequence_length:i, 0])
            y.append(scaled_data[i, 0])
        
        X, y = np.array(X), np.array(y)
        
        # Split into train and test
        train_size = int(len(X) * DATA_CONFIG['train_split'])
        X_train, X_test = X[:train_size], X[train_size:]
        y_train, y_test = y[:train_size], y[train_size:]
        
        # Reshape for LSTM [samples, time steps, features]
        X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
        X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))
        
        print(f"Training samples: {X_train.shape[0]}")
        print(f"Testing samples: {X_test.shape[0]}")
        
        return X_train, y_train, X_test, y_test, self.scaler
    
    def save_data(self, filename=None):
        """
        Save processed data to CSV
        
        Args:
            filename (str): Output filename (optional)
        """
        if filename is None:
            filename = f"{self.ticker}_{self.period}_data.csv"
        
        filepath = os.path.join(PATHS['processed_data'], filename)
        os.makedirs(PATHS['processed_data'], exist_ok=True)
        
        self.data.to_csv(filepath)
        print(f"Data saved to {filepath}")
    
    def save_scaler(self, filename='scaler.pkl'):
        """
        Save the scaler for future use
        
        Args:
            filename (str): Scaler filename
        """
        filepath = os.path.join(PATHS['models_dir'], filename)
        os.makedirs(PATHS['models_dir'], exist_ok=True)
        
        joblib.dump(self.scaler, filepath)
        print(f"Scaler saved to {filepath}")
    
    def load_scaler(self, filename='scaler.pkl'):
        """
        Load a previously saved scaler
        
        Args:
            filename (str): Scaler filename
        """
        filepath = os.path.join(PATHS['models_dir'], filename)
        self.scaler = joblib.load(filepath)
        print(f"Scaler loaded from {filepath}")
        return self.scaler


def validate_ticker(ticker):
    """
    Validate if a ticker symbol exists and has data
    
    Args:
        ticker (str): Stock ticker symbol
        
    Returns:
        bool: True if valid, False otherwise
    """
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period='5d')
        return not data.empty
    except:
        return False


def get_stock_info(ticker):
    """
    Get basic information about a stock
    
    Args:
        ticker (str): Stock ticker symbol
        
    Returns:
        dict: Stock information
    """
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        
        return {
            'name': info.get('longName', 'N/A'),
            'sector': info.get('sector', 'N/A'),
            'industry': info.get('industry', 'N/A'),
            'market_cap': info.get('marketCap', 'N/A'),
            'currency': info.get('currency', 'USD'),
        }
    except Exception as e:
        print(f"Error getting stock info: {str(e)}")
        return {}


if __name__ == "__main__":
    # Example usage
    loader = StockDataLoader('AAPL', period='5y')
    
    # Fetch data
    data = loader.fetch_data()
    print(f"\nData shape: {data.shape}")
    print(f"Date range: {data.index[0]} to {data.index[-1]}")
    
    # Calculate technical indicators
    data_with_indicators = loader.calculate_technical_indicators()
    print(f"\nColumns: {list(data_with_indicators.columns)}")
    
    # Prepare sequences
    X_train, y_train, X_test, y_test, scaler = loader.prepare_sequences()
    print(f"\nX_train shape: {X_train.shape}")
    print(f"y_train shape: {y_train.shape}")
    
    # Save data and scaler
    loader.save_data()
    loader.save_scaler()
    
    print("\n✅ Data preparation complete!")

