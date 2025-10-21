# predict.py
import torch
import torchvision.transforms as transforms
from torchvision.datasets import MNIST
from torch.utils.data import DataLoader, random_split, ConcatDataset
import matplotlib.pyplot as plt

# Import from our custom files
from model import NeuralNetwork
import config as cfg

def get_test_batch():
    torch.manual_seed(cfg.RANDOM_SEED)
    
    transform = transforms.ToTensor()
    
    # Load and split data exactly as in train.py
    train_dataset = MNIST(root=cfg.DATA_DIR, train=True, transform=transform, download=True)
    test_dataset = MNIST(root=cfg.DATA_DIR, train=False, transform=transform, download=True)
    combined_dataset = ConcatDataset([train_dataset, test_dataset])
    train_size = int(0.8 * len(combined_dataset))
    test_size = len(combined_dataset) - train_size
    _, test_dataset = random_split(combined_dataset, [train_size, test_size])
    
    # Create the test loader
    test_loader = DataLoader(test_dataset, batch_size=cfg.BATCH_SIZE, shuffle=False)
    
    # Get one batch
    examples = iter(test_loader)
    example_data, example_targets = next(examples)
    
    return example_data, example_targets

def main():
    # --- 1. Load a batch of test data ---
    example_data, example_targets = get_test_batch()

    # --- 2. Initialize and Load Model ---
    model = NeuralNetwork(cfg.INPUT_SIZE, cfg.HIDDEN_SIZE, cfg.NUM_CLASSES).to(cfg.DEVICE)
    try:
        model.load_state_dict(torch.load(cfg.MODEL_PATH, map_location=cfg.DEVICE))
    except FileNotFoundError:
        print(f"Error: Model file not found at {cfg.MODEL_PATH}")
        print("Please run train.py first to train and save the model.")
        return
        
    model.eval() 

    # --- 3. Make Predictions ---
    with torch.no_grad():
        example_images = example_data.reshape(-1, 28 * 28).to(cfg.DEVICE)
        outputs = model(example_images)
        _, preds = torch.max(outputs.data, 1)

    # --- 4. Visualize Predictions ---
    print("Plotting predictions for 6 test images...")
    plt.figure(figsize=(10, 4))
    for i in range(6):
        plt.subplot(2, 3, i + 1)
        plt.imshow(example_data[i][0], cmap='gray')
        plt.title(f'Actual: {example_targets[i].item()}, Predicted: {preds[i].item()}')
        plt.axis('off')
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()