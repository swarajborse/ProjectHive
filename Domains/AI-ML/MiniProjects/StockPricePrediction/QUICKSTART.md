# 🚀 Quick Start Guide - Stock Price Prediction

Get started with stock price prediction in 5 minutes!

## 📋 Prerequisites

- Python 3.8 or higher
- pip package manager
- Internet connection (for downloading stock data)

## ⚡ Installation

### 1. Navigate to Project Directory
```bash
cd Domains/AI-ML/MiniProjects/StockPricePrediction
```

### 2. Create Virtual Environment (Recommended)
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

## 🎯 Basic Usage

### Option 1: Train and Predict (Recommended for First Time)

#### Step 1: Train the Model
```bash
# Train model for Apple stock (AAPL)
python train_model.py --ticker AAPL --period 5y

# This will:
# - Download 5 years of AAPL stock data
# - Train an LSTM model
# - Save the model and scaler
# - Display training metrics
```

**Expected Output:**
```
🚀 Stock Price Prediction - Training Pipeline
📊 Configuration:
  Ticker: AAPL
  Period: 5y
  ...
✅ Training Complete!
Test MAE: $2.34
Test RMSE: $3.12
```

#### Step 2: Make Predictions
```bash
# Predict next 30 days
python predict.py --ticker AAPL --days 30

# This will:
# - Load the trained model
# - Fetch latest stock data
# - Predict future prices
# - Save and display results
```

**Expected Output:**
```
📈 Stock Price Prediction - Forecasting Pipeline
📊 Prediction Results:
  Current Price: $175.50
  Predicted Price (Day 30): $182.30
  Expected Change: $6.80
  Expected Change %: 3.87%
```

### Option 2: Use Different Stocks

```bash
# Google (Alphabet)
python train_model.py --ticker GOOGL --period 5y
python predict.py --ticker GOOGL --days 30

# Microsoft
python train_model.py --ticker MSFT --period 5y
python predict.py --ticker MSFT --days 30

# Tesla
python train_model.py --ticker TSLA --period 5y
python predict.py --ticker TSLA --days 30
```

### Option 3: Custom Configuration

```bash
# Train with custom parameters
python train_model.py \
    --ticker AAPL \
    --period 5y \
    --sequence-length 90 \
    --epochs 100 \
    --batch-size 64

# Predict for 60 days
python predict.py \
    --ticker AAPL \
    --days 60
```

## 📊 Understanding the Output

### Training Output Files:
- `models/AAPL_5y_model.h5` - Trained LSTM model
- `models/AAPL_5y_scaler.pkl` - Data scaler
- `data/processed/AAPL_5y_data.csv` - Processed data
- `results/plots/training_history.png` - Training metrics plot

### Prediction Output Files:
- `results/AAPL_predictions_YYYYMMDD.csv` - Prediction data
- `results/plots/AAPL_prediction_YYYYMMDD.png` - Prediction visualization

## 🎓 Common Use Cases

### 1. Quick Stock Analysis
```bash
# Analyze a stock quickly
python train_model.py --ticker NVDA --period 2y --epochs 30
python predict.py --ticker NVDA --days 14
```

### 2. Long-term Prediction
```bash
# Train on maximum data
python train_model.py --ticker AAPL --period max
python predict.py --ticker AAPL --days 90
```

### 3. Multiple Stock Comparison
```bash
# Compare tech stocks
for ticker in AAPL GOOGL MSFT AMZN; do
    python train_model.py --ticker $ticker --period 5y
    python predict.py --ticker $ticker --days 30
done
```

## 🐛 Troubleshooting

### Issue: ModuleNotFoundError
```
Solution: Make sure you're in the virtual environment and installed requirements
pip install -r requirements.txt
```

### Issue: Invalid ticker symbol
```
Solution: Check the ticker symbol on Yahoo Finance
Visit: https://finance.yahoo.com/
```

### Issue: Insufficient data
```
Solution: Use a longer period
python train_model.py --ticker AAPL --period 5y
```

### Issue: Model taking too long to train
```
Solution: Reduce epochs or use smaller dataset
python train_model.py --ticker AAPL --period 2y --epochs 30
```

## 📚 Next Steps

1. **Explore the Code**: Check `model.py`, `data_loader.py`, and `config.py`
2. **Customize Parameters**: Modify `config.py` for different settings
3. **Add Features**: Extend the model with more technical indicators
4. **Visualize More**: Use `utils.py` functions for additional plots

## 🎯 Tips for Better Predictions

1. **Use More Data**: Longer periods generally improve accuracy
2. **Train Longer**: Increase epochs for better convergence
3. **Experiment**: Try different sequence lengths
4. **Validate**: Always check model metrics before trusting predictions
5. **Update Regularly**: Retrain models with latest data

## ⚠️ Important Reminders

- **Educational Purpose Only**: Not financial advice
- **Market Volatility**: Predictions may not reflect sudden market changes
- **Regular Updates**: Retrain models periodically
- **Risk Assessment**: Always do your own research

## 💡 Example Workflow

```bash
# Complete workflow example
cd Domains/AI-ML/MiniProjects/StockPricePrediction

# Setup
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Train
python train_model.py --ticker AAPL --period 5y

# Predict
python predict.py --ticker AAPL --days 30

# Check results
ls -la results/
ls -la results/plots/
```

## 📞 Need Help?

- Check the full [README.md](README.md)
- Review [config.py](config.py) for all configuration options
- Examine example code in each module
- Open an issue on GitHub

---

**Happy Predicting! 📈🚀**

*Remember: This is for educational purposes only. Not financial advice!*

