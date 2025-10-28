"""
Configuration file for Stock Price Prediction
Contains all hyperparameters and settings
"""

# Model Configuration
MODEL_CONFIG = {
    'sequence_length': 60,          # Number of days to look back
    'lstm_units': [50, 50, 50],     # Units in each LSTM layer
    'dropout_rate': 0.2,            # Dropout rate for regularization
    'learning_rate': 0.001,         # Learning rate for Adam optimizer
    'epochs': 50,                   # Number of training epochs
    'batch_size': 32,               # Batch size for training
    'validation_split': 0.2,        # Train/validation split ratio
}

# Data Configuration
DATA_CONFIG = {
    'train_split': 0.8,             # Train/test split ratio
    'features': ['Close'],           # Features to use for prediction
    'normalize': True,               # Whether to normalize data
    'default_period': '5y',          # Default historical data period
    'min_data_points': 100,          # Minimum data points required
}

# Prediction Configuration
PRED_CONFIG = {
    'confidence_interval': 0.95,     # Confidence interval for predictions
    'default_days': 30,              # Default number of days to predict
    'max_days': 90,                  # Maximum prediction days allowed
    'min_days': 1,                   # Minimum prediction days
}

# Technical Indicators Configuration
INDICATORS_CONFIG = {
    'ma_periods': [20, 50, 200],     # Moving average periods
    'rsi_period': 14,                # RSI calculation period
    'macd_fast': 12,                 # MACD fast period
    'macd_slow': 26,                 # MACD slow period
    'macd_signal': 9,                # MACD signal period
    'bollinger_period': 20,          # Bollinger bands period
    'bollinger_std': 2,              # Bollinger bands standard deviation
}

# Visualization Configuration
VIZ_CONFIG = {
    'figure_size': (15, 8),          # Default figure size
    'dpi': 100,                      # DPI for saved figures
    'style': 'seaborn-v0_8-darkgrid',# Matplotlib style
    'color_scheme': {
        'actual': '#2E86AB',         # Color for actual prices
        'predicted': '#A23B72',      # Color for predictions
        'ma_20': '#F18F01',          # Color for 20-day MA
        'ma_50': '#C73E1D',          # Color for 50-day MA
    }
}

# File Paths
PATHS = {
    'data_dir': 'data/',
    'raw_data': 'data/raw/',
    'processed_data': 'data/processed/',
    'models_dir': 'models/',
    'results_dir': 'results/',
    'plots_dir': 'results/plots/',
    'logs_dir': 'logs/',
}

# Supported Stock Tickers (Popular ones)
POPULAR_TICKERS = [
    'AAPL',   # Apple Inc.
    'GOOGL',  # Alphabet Inc.
    'MSFT',   # Microsoft Corporation
    'AMZN',   # Amazon.com Inc.
    'TSLA',   # Tesla Inc.
    'META',   # Meta Platforms Inc.
    'NVDA',   # NVIDIA Corporation
    'JPM',    # JPMorgan Chase & Co.
    'V',      # Visa Inc.
    'WMT',    # Walmart Inc.
    'DIS',    # The Walt Disney Company
    'NFLX',   # Netflix Inc.
    'BA',     # Boeing Company
    'INTC',   # Intel Corporation
    'AMD',    # Advanced Micro Devices
]

# Logging Configuration
LOGGING_CONFIG = {
    'level': 'INFO',
    'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    'filename': 'logs/stock_prediction.log',
}

