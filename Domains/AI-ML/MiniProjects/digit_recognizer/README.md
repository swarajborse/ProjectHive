                 MNIST DIGIT CLASSIFIER

**Contributor:** Dhiraj201226
**Domain:** AI-ML
**Difficulty:** [Beginner]

## Description
It's a complete machine learning project, written in Python using the PyTorch library. Its entire purpose is to look at a small, grayscale image of a handwritten number and correctly identify what number it is (from 0 to 9 currently).

This project solves the fundamental problem of automatic image classification.

Specifically, it provides an automated solution to the real-world challenge of Optical Character Recognition (OCR) for digits. This is a classic problem in computer vision.

## Dataset
- **Source**: Automatically via torchvision.datasets.MNIST(..., download=True), which automatically downloads the dataset from official mirrors (like one hosted on AWS S3).

- **Size**: 70000 images

- **Features**: Each image is 28*28 pixel grayscale image
and it is flattened into a 1-dimensional vector of 784 features (28 * 28 = 784).

## Model Architecture
- Algorithm/Architecture used:
Simple Feed-Forward Neural Network (MLP) built with PyTorch (nn.Module). It has one hidden layer: Input (784 features) -> Linear(784 -> 512) -> ReLU -> Linear(512 -> 10) -> Output Scores.

               KEY HYPERPARAMETERS

 ->INPUT_SIZE: 784
->NUM_CLASSES: 10
->NUM_EPOCHS: 50
->BATCH_SIZE: 100 
->LEARNING_RATE: 0.001

               - Training approach
The model is trained on 50 epoches for better accuracy and also the 70k dataset is divided into 56k for training and 14k for test
dataset is traine on 56k immages.

## Requirements
matplotlib==3.9.0
numpy==1.26.4
packaging==24.1
pillow==10.4.0
torch==2.3.1+cpu
torchvision==0.18.1+cpu

# Train model
python train.py{
    RUN model.py and config.py before it.
}

# Make predictions
python predict.py

## Results
- Accuracy: 99.76%(training dataset)
- Other metrics: final training loss:
- Sample outputs:In random infernece it predicted all images correct. 
refer to Figure_1.png
## References
->Learning representations by back-propagating errors (1986) - Rumelhart, Hinton, Williams
->ImageNet Classification with Deep Convolutional Neural Networks (2012)- Krizhevsky, Sutskever, Hinton