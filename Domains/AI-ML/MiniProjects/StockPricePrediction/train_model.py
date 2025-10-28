"""
Main training script for Stock Price Prediction
Run this script to train the LSTM model on stock data
"""

import argparse
import sys
import os
import numpy as np
from datetime import datetime

from data_loader import StockDataLoader, validate_ticker
from model import StockPredictionModel
from config import MODEL_CONFIG, POPULAR_TICKERS


def train_stock_model(ticker, period='5y', sequence_length=60, save_model=True):
    """
    Train LSTM model for stock price prediction
    
    Args:
        ticker (str): Stock ticker symbol
        period (str): Historical data period
        sequence_length (int): Number of time steps
        save_model (bool): Whether to save the trained model
        
    Returns:
        tuple: (model, metrics, history)
    """
    print("=" * 70)
    print(f"🚀 Stock Price Prediction - Training Pipeline")
    print("=" * 70)
    print(f"\n📊 Configuration:")
    print(f"  Ticker: {ticker}")
    print(f"  Period: {period}")
    print(f"  Sequence Length: {sequence_length}")
    print(f"  LSTM Units: {MODEL_CONFIG['lstm_units']}")
    print(f"  Epochs: {MODEL_CONFIG['epochs']}")
    print(f"  Batch Size: {MODEL_CONFIG['batch_size']}")
    print(f"  Learning Rate: {MODEL_CONFIG['learning_rate']}")
    
    # Step 1: Validate ticker
    print(f"\n📝 Step 1: Validating ticker '{ticker}'...")
    if not validate_ticker(ticker):
        print(f"❌ Error: Invalid ticker symbol '{ticker}'")
        print(f"\n💡 Try one of these popular tickers:")
        print(f"   {', '.join(POPULAR_TICKERS[:10])}")
        return None, None, None
    print(f"✅ Ticker validated!")
    
    # Step 2: Load and prepare data
    print(f"\n📥 Step 2: Loading data...")
    try:
        loader = StockDataLoader(ticker, period)
        data = loader.fetch_data()
        
        # Calculate technical indicators
        print("📊 Calculating technical indicators...")
        data_with_indicators = loader.calculate_technical_indicators()
        
        # Prepare sequences
        print("🔄 Preparing data sequences...")
        X_train, y_train, X_test, y_test, scaler = loader.prepare_sequences(
            sequence_length=sequence_length
        )
        
        print(f"\n📈 Data Statistics:")
        print(f"  Total data points: {len(data)}")
        print(f"  Training samples: {len(X_train)}")
        print(f"  Testing samples: {len(X_test)}")
        print(f"  Date range: {data.index[0].date()} to {data.index[-1].date()}")
        print(f"  Price range: ${data['Close'].min():.2f} - ${data['Close'].max():.2f}")
        
    except Exception as e:
        print(f"❌ Error loading data: {str(e)}")
        return None, None, None
    
    # Step 3: Build and train model
    print(f"\n🏗️  Step 3: Building model...")
    try:
        model = StockPredictionModel(
            sequence_length=sequence_length,
            n_features=1
        )
        model.build_model()
        
        print(f"\n🎯 Step 4: Training model...")
        print("⏳ This may take a while...")
        
        history = model.train(X_train, y_train, X_test, y_test)
        
    except Exception as e:
        print(f"❌ Error training model: {str(e)}")
        return None, None, None
    
    # Step 4: Evaluate model
    print(f"\n📊 Step 5: Evaluating model...")
    try:
        metrics = model.evaluate(X_test, y_test)
        
        # Calculate actual price metrics
        predictions_scaled = model.predict(X_test)
        predictions_actual = scaler.inverse_transform(predictions_scaled)
        y_test_actual = scaler.inverse_transform(y_test.reshape(-1, 1))
        
        mae_dollars = np.mean(np.abs(predictions_actual - y_test_actual))
        rmse_dollars = np.sqrt(np.mean((predictions_actual - y_test_actual) ** 2))
        
        print(f"\n💰 Actual Price Metrics:")
        print(f"  MAE:  ${mae_dollars:.2f}")
        print(f"  RMSE: ${rmse_dollars:.2f}")
        
    except Exception as e:
        print(f"⚠️  Warning during evaluation: {str(e)}")
        metrics = None
    
    # Step 5: Save model and scaler
    if save_model:
        print(f"\n💾 Step 6: Saving model and scaler...")
        try:
            model_filename = f"{ticker}_{period}_model.h5"
            scaler_filename = f"{ticker}_{period}_scaler.pkl"
            
            model.save_model(model_filename)
            loader.save_scaler(scaler_filename)
            loader.save_data(f"{ticker}_{period}_data.csv")
            
            print("✅ All files saved successfully!")
            
        except Exception as e:
            print(f"⚠️  Warning saving files: {str(e)}")
    
    # Print summary
    print("\n" + "=" * 70)
    print("✅ Training Complete!")
    print("=" * 70)
    print(f"\n📝 Summary:")
    print(f"  Ticker: {ticker}")
    print(f"  Training samples: {len(X_train)}")
    print(f"  Test MAE: ${mae_dollars:.2f}")
    print(f"  Test RMSE: ${rmse_dollars:.2f}")
    print(f"  Model saved: {save_model}")
    
    print(f"\n🎯 Next Steps:")
    print(f"  1. Run predictions: python predict.py --ticker {ticker} --days 30")
    print(f"  2. Visualize results: python visualize.py --ticker {ticker}")
    print(f"  3. Launch web app: streamlit run app.py")
    
    return model, metrics, history


def main():
    """Main function to run training from command line"""
    parser = argparse.ArgumentParser(
        description='Train LSTM model for stock price prediction'
    )
    parser.add_argument(
        '--ticker',
        type=str,
        default='AAPL',
        help='Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)'
    )
    parser.add_argument(
        '--period',
        type=str,
        default='5y',
        choices=['1y', '2y', '5y', '10y', 'max'],
        help='Historical data period'
    )
    parser.add_argument(
        '--sequence-length',
        type=int,
        default=60,
        help='Number of days to look back'
    )
    parser.add_argument(
        '--epochs',
        type=int,
        default=None,
        help='Number of training epochs (overrides config)'
    )
    parser.add_argument(
        '--batch-size',
        type=int,
        default=None,
        help='Batch size for training (overrides config)'
    )
    parser.add_argument(
        '--no-save',
        action='store_true',
        help='Do not save the trained model'
    )
    
    args = parser.parse_args()
    
    # Override config if specified
    if args.epochs:
        MODEL_CONFIG['epochs'] = args.epochs
    if args.batch_size:
        MODEL_CONFIG['batch_size'] = args.batch_size
    
    # Train model
    model, metrics, history = train_stock_model(
        ticker=args.ticker.upper(),
        period=args.period,
        sequence_length=args.sequence_length,
        save_model=not args.no_save
    )
    
    if model is None:
        sys.exit(1)
    
    print("\n🎉 All done! Happy predicting! 📈")


if __name__ == "__main__":
    main()

