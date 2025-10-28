"""
Prediction script for Stock Price Prediction
Run this script to make predictions using a trained model
"""

import argparse
import sys
import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

from data_loader import StockDataLoader, validate_ticker
from model import StockPredictionModel
from config import PRED_CONFIG, PATHS, VIZ_CONFIG


def predict_stock_prices(ticker, days=30, period='5y', model_file=None):
    """
    Predict future stock prices using trained model
    
    Args:
        ticker (str): Stock ticker symbol
        days (int): Number of days to predict
        period (str): Historical data period
        model_file (str): Path to model file (optional)
        
    Returns:
        pd.DataFrame: Predictions dataframe
    """
    print("=" * 70)
    print(f"📈 Stock Price Prediction - Forecasting Pipeline")
    print("=" * 70)
    print(f"\n📊 Configuration:")
    print(f"  Ticker: {ticker}")
    print(f"  Prediction Days: {days}")
    print(f"  Historical Period: {period}")
    
    # Validate inputs
    if days < PRED_CONFIG['min_days'] or days > PRED_CONFIG['max_days']:
        print(f"\n⚠️  Warning: Prediction days should be between "
              f"{PRED_CONFIG['min_days']} and {PRED_CONFIG['max_days']}")
        days = min(max(days, PRED_CONFIG['min_days']), PRED_CONFIG['max_days'])
        print(f"   Adjusted to {days} days")
    
    # Step 1: Validate ticker
    print(f"\n📝 Step 1: Validating ticker '{ticker}'...")
    if not validate_ticker(ticker):
        print(f"❌ Error: Invalid ticker symbol '{ticker}'")
        return None
    print(f"✅ Ticker validated!")
    
    # Step 2: Load data
    print(f"\n📥 Step 2: Loading data...")
    try:
        loader = StockDataLoader(ticker, period)
        data = loader.fetch_data()
        
        # Load scaler
        scaler_file = f"{ticker}_{period}_scaler.pkl"
        if os.path.exists(os.path.join(PATHS['models_dir'], scaler_file)):
            loader.load_scaler(scaler_file)
        else:
            print(f"⚠️  Scaler not found, creating new one...")
            # Prepare sequences will fit a new scaler
            _, _, _, _, scaler = loader.prepare_sequences()
            loader.scaler = scaler
        
        print(f"✅ Data loaded: {len(data)} data points")
        print(f"   Latest price: ${data['Close'].iloc[-1]:.2f}")
        
    except Exception as e:
        print(f"❌ Error loading data: {str(e)}")
        return None
    
    # Step 3: Load model
    print(f"\n🏗️  Step 3: Loading model...")
    try:
        model = StockPredictionModel(sequence_length=60)
        
        if model_file:
            model.load_model(model_file)
        else:
            # Try to load ticker-specific model
            ticker_model = f"{ticker}_{period}_model.h5"
            if os.path.exists(os.path.join(PATHS['models_dir'], ticker_model)):
                model.load_model(ticker_model)
            else:
                # Try default model
                print("⚠️  Ticker-specific model not found, trying default...")
                model.load_model('lstm_stock_model.h5')
        
        print("✅ Model loaded successfully!")
        
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        print("\n💡 Hint: Train a model first using: python train_model.py")
        return None
    
    # Step 4: Prepare last sequence
    print(f"\n🔄 Step 4: Preparing prediction sequence...")
    try:
        close_prices = data['Close'].values[-60:].reshape(-1, 1)
        scaled_sequence = loader.scaler.transform(close_prices)
        
    except Exception as e:
        print(f"❌ Error preparing sequence: {str(e)}")
        return None
    
    # Step 5: Make predictions
    print(f"\n🎯 Step 5: Making predictions for next {days} days...")
    try:
        predictions = model.predict_future(
            scaled_sequence,
            loader.scaler,
            days=days
        )
        
        # Create prediction dataframe
        last_date = data.index[-1]
        pred_dates = pd.date_range(
            start=last_date + timedelta(days=1),
            periods=days,
            freq='D'
        )
        
        pred_df = pd.DataFrame({
            'Date': pred_dates,
            'Predicted_Price': predictions.flatten()
        })
        pred_df.set_index('Date', inplace=True)
        
        print("✅ Predictions complete!")
        
    except Exception as e:
        print(f"❌ Error making predictions: {str(e)}")
        return None
    
    # Step 6: Display and save results
    print(f"\n📊 Prediction Results:")
    print("=" * 70)
    print(f"\n  Current Price (Latest): ${data['Close'].iloc[-1]:.2f}")
    print(f"  Predicted Price (Day {days}): ${predictions[-1][0]:.2f}")
    print(f"  Expected Change: ${predictions[-1][0] - data['Close'].iloc[-1]:.2f}")
    print(f"  Expected Change %: {((predictions[-1][0] / data['Close'].iloc[-1]) - 1) * 100:.2f}%")
    
    print(f"\n  First 7 days predictions:")
    for i in range(min(7, len(pred_df))):
        date = pred_df.index[i].strftime('%Y-%m-%d')
        price = pred_df['Predicted_Price'].iloc[i]
        print(f"    {date}: ${price:.2f}")
    
    if len(pred_df) > 7:
        print(f"    ... ({len(pred_df) - 7} more days)")
    
    # Save predictions
    try:
        os.makedirs(PATHS['results_dir'], exist_ok=True)
        output_file = os.path.join(
            PATHS['results_dir'],
            f"{ticker}_predictions_{datetime.now().strftime('%Y%m%d')}.csv"
        )
        pred_df.to_csv(output_file)
        print(f"\n💾 Predictions saved to: {output_file}")
    except Exception as e:
        print(f"⚠️  Could not save predictions: {str(e)}")
    
    # Quick visualization
    print(f"\n📈 Generating quick visualization...")
    try:
        plot_predictions_quick(data, pred_df, ticker)
    except Exception as e:
        print(f"⚠️  Could not generate plot: {str(e)}")
    
    print("\n" + "=" * 70)
    print("✅ Prediction Complete!")
    print("=" * 70)
    
    return pred_df


def plot_predictions_quick(historical_data, predictions, ticker):
    """
    Create a quick visualization of predictions
    
    Args:
        historical_data (pd.DataFrame): Historical price data
        predictions (pd.DataFrame): Prediction data
        ticker (str): Stock ticker symbol
    """
    plt.figure(figsize=VIZ_CONFIG['figure_size'])
    
    # Plot last 90 days of historical data
    recent_data = historical_data.tail(90)
    plt.plot(recent_data.index, recent_data['Close'],
             label='Historical Price',
             color=VIZ_CONFIG['color_scheme']['actual'],
             linewidth=2)
    
    # Plot predictions
    plt.plot(predictions.index, predictions['Predicted_Price'],
             label='Predicted Price',
             color=VIZ_CONFIG['color_scheme']['predicted'],
             linewidth=2,
             linestyle='--',
             marker='o',
             markersize=3)
    
    plt.title(f'{ticker} Stock Price - Historical & Predictions',
              fontsize=16,
              fontweight='bold')
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Price (USD)', fontsize=12)
    plt.legend(fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    
    # Save plot
    os.makedirs(PATHS['plots_dir'], exist_ok=True)
    plot_file = os.path.join(
        PATHS['plots_dir'],
        f"{ticker}_prediction_{datetime.now().strftime('%Y%m%d')}.png"
    )
    plt.savefig(plot_file, dpi=VIZ_CONFIG['dpi'])
    print(f"📊 Plot saved to: {plot_file}")
    
    # Try to show plot (may not work in some environments)
    try:
        plt.show()
    except:
        pass


def main():
    """Main function to run predictions from command line"""
    parser = argparse.ArgumentParser(
        description='Predict future stock prices using trained LSTM model'
    )
    parser.add_argument(
        '--ticker',
        type=str,
        default='AAPL',
        help='Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)'
    )
    parser.add_argument(
        '--days',
        type=int,
        default=30,
        help=f'Number of days to predict (1-{PRED_CONFIG["max_days"]})'
    )
    parser.add_argument(
        '--period',
        type=str,
        default='5y',
        choices=['1y', '2y', '5y', '10y', 'max'],
        help='Historical data period'
    )
    parser.add_argument(
        '--model',
        type=str,
        default=None,
        help='Path to model file (optional)'
    )
    
    args = parser.parse_args()
    
    # Make predictions
    predictions = predict_stock_prices(
        ticker=args.ticker.upper(),
        days=args.days,
        period=args.period,
        model_file=args.model
    )
    
    if predictions is None:
        sys.exit(1)
    
    print("\n🎉 All done! Happy investing! 💰")
    print("\n⚠️  Disclaimer: This is for educational purposes only.")
    print("   Not financial advice. Always do your own research!")


if __name__ == "__main__":
    main()

