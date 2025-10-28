"""
Utility functions for Stock Price Prediction
Helper functions for visualization, metrics, and data processing
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import os
from config import VIZ_CONFIG, PATHS


def calculate_metrics(y_true, y_pred):
    """
    Calculate various performance metrics
    
    Args:
        y_true (np.array): True values
        y_pred (np.array): Predicted values
        
    Returns:
        dict: Dictionary of metrics
    """
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_true, y_pred)
    
    # Avoid division by zero
    mask = y_true != 0
    mape = np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100
    
    r2 = r2_score(y_true, y_pred)
    
    return {
        'MSE': mse,
        'RMSE': rmse,
        'MAE': mae,
        'MAPE': mape,
        'R2': r2
    }


def plot_training_history(history, ticker=None):
    """
    Plot training history (loss and metrics)
    
    Args:
        history: Keras training history object
        ticker (str): Stock ticker symbol (optional)
    """
    fig, axes = plt.subplots(1, 2, figsize=(15, 5))
    
    # Plot loss
    axes[0].plot(history.history['loss'], label='Training Loss')
    axes[0].plot(history.history['val_loss'], label='Validation Loss')
    axes[0].set_title('Model Loss Over Epochs')
    axes[0].set_xlabel('Epoch')
    axes[0].set_ylabel('Loss')
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)
    
    # Plot MAE
    axes[1].plot(history.history['mae'], label='Training MAE')
    axes[1].plot(history.history['val_mae'], label='Validation MAE')
    axes[1].set_title('Model MAE Over Epochs')
    axes[1].set_xlabel('Epoch')
    axes[1].set_ylabel('MAE')
    axes[1].legend()
    axes[1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    
    # Save plot
    os.makedirs(PATHS['plots_dir'], exist_ok=True)
    filename = f"training_history_{ticker}.png" if ticker else "training_history.png"
    filepath = os.path.join(PATHS['plots_dir'], filename)
    plt.savefig(filepath, dpi=VIZ_CONFIG['dpi'])
    print(f"Training history plot saved to: {filepath}")
    
    return fig


def plot_predictions_vs_actual(y_true, y_pred, dates=None, ticker=None):
    """
    Plot predicted vs actual prices
    
    Args:
        y_true (np.array): Actual prices
        y_pred (np.array): Predicted prices
        dates (pd.DatetimeIndex): Dates for x-axis (optional)
        ticker (str): Stock ticker symbol (optional)
    """
    plt.figure(figsize=VIZ_CONFIG['figure_size'])
    
    if dates is None:
        x = range(len(y_true))
        xlabel = 'Time Steps'
    else:
        x = dates
        xlabel = 'Date'
    
    plt.plot(x, y_true, label='Actual Price',
             color=VIZ_CONFIG['color_scheme']['actual'], linewidth=2)
    plt.plot(x, y_pred, label='Predicted Price',
             color=VIZ_CONFIG['color_scheme']['predicted'],
             linewidth=2, linestyle='--', alpha=0.8)
    
    title = f'{ticker} - Predictions vs Actual' if ticker else 'Predictions vs Actual'
    plt.title(title, fontsize=16, fontweight='bold')
    plt.xlabel(xlabel, fontsize=12)
    plt.ylabel('Price (USD)', fontsize=12)
    plt.legend(fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    
    # Save plot
    os.makedirs(PATHS['plots_dir'], exist_ok=True)
    filename = f"predictions_vs_actual_{ticker}.png" if ticker else "predictions_vs_actual.png"
    filepath = os.path.join(PATHS['plots_dir'], filename)
    plt.savefig(filepath, dpi=VIZ_CONFIG['dpi'])
    print(f"Predictions plot saved to: {filepath}")
    
    return plt.gcf()


def plot_residuals(y_true, y_pred, ticker=None):
    """
    Plot residuals (prediction errors)
    
    Args:
        y_true (np.array): Actual prices
        y_pred (np.array): Predicted prices
        ticker (str): Stock ticker symbol (optional)
    """
    residuals = y_true - y_pred
    
    fig, axes = plt.subplots(1, 2, figsize=(15, 5))
    
    # Residuals over time
    axes[0].plot(residuals, color='red', alpha=0.6)
    axes[0].axhline(y=0, color='black', linestyle='--', linewidth=1)
    axes[0].set_title('Residuals Over Time')
    axes[0].set_xlabel('Time Steps')
    axes[0].set_ylabel('Residual (Actual - Predicted)')
    axes[0].grid(True, alpha=0.3)
    
    # Residuals distribution
    axes[1].hist(residuals, bins=50, color='red', alpha=0.6, edgecolor='black')
    axes[1].set_title('Residuals Distribution')
    axes[1].set_xlabel('Residual Value')
    axes[1].set_ylabel('Frequency')
    axes[1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    
    # Save plot
    os.makedirs(PATHS['plots_dir'], exist_ok=True)
    filename = f"residuals_{ticker}.png" if ticker else "residuals.png"
    filepath = os.path.join(PATHS['plots_dir'], filename)
    plt.savefig(filepath, dpi=VIZ_CONFIG['dpi'])
    print(f"Residuals plot saved to: {filepath}")
    
    return fig


def create_directories():
    """Create necessary directories for the project"""
    directories = [
        PATHS['data_dir'],
        PATHS['raw_data'],
        PATHS['processed_data'],
        PATHS['models_dir'],
        PATHS['results_dir'],
        PATHS['plots_dir'],
        PATHS['logs_dir']
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        
        # Create .gitkeep files
        gitkeep_path = os.path.join(directory, '.gitkeep')
        if not os.path.exists(gitkeep_path):
            open(gitkeep_path, 'a').close()
    
    print("✅ Directory structure created successfully!")


def format_currency(value):
    """
    Format value as currency
    
    Args:
        value (float): Value to format
        
    Returns:
        str: Formatted currency string
    """
    return f"${value:,.2f}"


def calculate_percent_change(old_value, new_value):
    """
    Calculate percentage change
    
    Args:
        old_value (float): Old value
        new_value (float): New value
        
    Returns:
        float: Percentage change
    """
    if old_value == 0:
        return 0
    return ((new_value - old_value) / old_value) * 100


def get_trading_days_between(start_date, end_date):
    """
    Calculate number of trading days between two dates
    
    Args:
        start_date (datetime): Start date
        end_date (datetime): End date
        
    Returns:
        int: Number of trading days
    """
    # Simple approximation: ~252 trading days per year
    days = (end_date - start_date).days
    return int(days * 252 / 365)


def print_metrics_table(metrics):
    """
    Print metrics in a formatted table
    
    Args:
        metrics (dict): Dictionary of metrics
    """
    print("\n" + "=" * 50)
    print("📊 Performance Metrics")
    print("=" * 50)
    
    for metric_name, value in metrics.items():
        if metric_name == 'MAPE':
            print(f"{metric_name:10s}: {value:>12.2f}%")
        else:
            print(f"{metric_name:10s}: {value:>12.6f}")
    
    print("=" * 50)


if __name__ == "__main__":
    # Test utility functions
    print("🔧 Testing utility functions...")
    
    # Create directories
    create_directories()
    
    # Test metrics calculation
    y_true = np.array([100, 105, 103, 108, 110])
    y_pred = np.array([101, 104, 105, 107, 109])
    
    metrics = calculate_metrics(y_true, y_pred)
    print_metrics_table(metrics)
    
    # Test currency formatting
    print(f"\nFormatted currency: {format_currency(1234567.89)}")
    
    # Test percent change
    pct_change = calculate_percent_change(100, 110)
    print(f"Percent change: {pct_change:.2f}%")
    
    print("\n✅ All utility tests passed!")

