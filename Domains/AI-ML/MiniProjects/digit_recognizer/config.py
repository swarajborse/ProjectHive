# config.py
import torch

# --- Model Hyperparameters ---
INPUT_SIZE = 784      # 28x28
HIDDEN_SIZE = 512
NUM_CLASSES = 10

# --- Training Hyperparameters ---
NUM_EPOCHS = 15
BATCH_SIZE = 100
LEARNING_RATE = 0.001
DATA_DIR = './data'
MODEL_PATH = 'mnist_nn1.pth' 

# --- Data & Reproducibility ---
RANDOM_SEED = 42

# --- Device ---
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")