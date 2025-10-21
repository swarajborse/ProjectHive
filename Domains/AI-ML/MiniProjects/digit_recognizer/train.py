# train.py
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.datasets import MNIST
from torch.utils.data import DataLoader, random_split, ConcatDataset

# Import from our custom files
from model import NeuralNetwork
import config as cfg

def get_data_loaders(batch_size, random_seed, data_dir):
    
    torch.manual_seed(random_seed)
    
    transform = transforms.ToTensor()
    
    # Load original train and test datasets
    train_dataset = MNIST(root=data_dir, train=True, transform=transform, download=True)
    test_dataset = MNIST(root=data_dir, train=False, transform=transform, download=True)
    
    # Combine them
    combined_dataset = ConcatDataset([train_dataset, test_dataset])
    
    # Create new 80/20 split
    train_size = int(0.8 * len(combined_dataset))
    test_size = len(combined_dataset) - train_size
    train_dataset, test_dataset = random_split(combined_dataset, [train_size, test_size])
    
    # Create DataLoaders
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    return train_loader, test_loader

def main():
    # --- 1. Load Data ---
    train_loader, test_loader = get_data_loaders(cfg.BATCH_SIZE, cfg.RANDOM_SEED, cfg.DATA_DIR)
    
    # --- 2. Initialize Model, Loss, and Optimizer ---
    model = NeuralNetwork(cfg.INPUT_SIZE, cfg.HIDDEN_SIZE, cfg.NUM_CLASSES).to(cfg.DEVICE)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=cfg.LEARNING_RATE)
    
    # --- 3. Training Loop ---
    print("Starting training...")
    n_total_steps = len(train_loader)
    for epoch in range(cfg.NUM_EPOCHS):
        for i, (images, labels) in enumerate(train_loader):
            # Reshape images to (batch_size, 784) and move to device
            images = images.reshape(-1, 28 * 28).to(cfg.DEVICE)
            labels = labels.to(cfg.DEVICE)
            
            # Forward pass
            predict_outputs = model(images)
            loss = criterion(predict_outputs, labels)
            
            # Backward pass and optimization
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()
            
            if (i + 1) % 500 == 0:
                print(f'Epoch [{epoch + 1}/{cfg.NUM_EPOCHS}], Step [{i + 1}/{n_total_steps}], Loss: {loss.item():.4f}')

    print("Training finished.")

    # --- 4. Evaluation ---
    with torch.no_grad():
        train_correct = 0
        train_samples = 0
        for images, labels in train_loader:
            images = images.reshape(-1, 28 * 28).to(cfg.DEVICE)
            labels = labels.to(cfg.DEVICE)
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            train_samples += labels.size(0)
            train_correct += (predicted == labels).sum().item()
        
        train_acc = 100.0 * train_correct / train_samples
        print(f'Accuracy of the network on the {train_samples} training images: {train_acc:.2f} %')

        test_correct = 0
        test_samples = 0
        for images, labels in test_loader:
            images = images.reshape(-1, 28 * 28).to(cfg.DEVICE)
            labels = labels.to(cfg.DEVICE)
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            test_samples += labels.size(0)
            test_correct += (predicted == labels).sum().item()

        test_acc = 100.0 * test_correct / test_samples
        print(f'Accuracy of the network on the {test_samples} test images: {test_acc:.2f} %')
        
    # --- 5. Save the Model ---
    torch.save(model.state_dict(), cfg.MODEL_PATH)
    print(f"Model saved to {cfg.MODEL_PATH}")

if __name__ == "__main__":
    main()