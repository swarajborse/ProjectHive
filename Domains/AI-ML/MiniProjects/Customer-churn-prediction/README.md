**Contributor:** ajithh404

# Bank Customer Churn Prediction

## Overview

This project focuses on developing an Artificial Neural Network (ANN) to predict whether a bank customer will leave the institution based on various customer attributes.

---

## Dataset

The dataset **Churn_Modeling.csv** contains 10,000 records of bank customers with the following columns:

* **RowNumber**
* **CustomerId**
* **Surname**
* **CreditScore**
* **Geography**
* **Gender**
* **Age**
* **Tenure**
* **Balance**
* **NumOfProducts**
* **HasCrCard**
* **IsActiveMember**
* **EstimatedSalary**
* **Exited**

**Objective:** Predict whether a customer will exit the bank (the **Exited** column) using all available features.

---

## Data Preprocessing

The preprocessing steps include:

1. **Removing unnecessary features**
2. **Label Encoding** for categorical variables
3. **One Hot Encoding** for categorical attributes
4. **Train-Test Split** to separate data into training and testing sets
5. **Feature Scaling** using **StandardScaler**

---

## Model Architecture

A simple ANN was built using Keras with the following configuration:

1. **Input Layer:** 11 input features, 6 output nodes
2. **Hidden Layer:** 6 nodes
3. **Output Layer:** 1 node

### Activation Functions

* Hidden Layers: **ReLU**
* Output Layer: **Sigmoid**

---

## Hyperparameters

* **Optimizer:** adam
* **Loss Function:** binary_crossentropy
* **Metrics:** accuracy
* **Batch Size:** 10
* **Epochs:** 100

---

## Model Performance

* **Training Accuracy:** 0.8610
* **Testing Accuracy:** 0.86

---

## Model Improvement Techniques

### 1. k-Fold Cross-Validation

* Divided the training set into 10 folds.
* Trained the model on 9 folds and validated on the remaining one, rotating through all folds.
* This reduced fluctuations in model accuracy.

### 2. Dropout Regularization

* Added dropout layers to reduce overfitting.
* The model achieved an accuracy of **0.8321**, indicating improved generalization.

### 3. GridSearchCV for Hyperparameter Tuning

* Used **GridSearchCV** to find the best hyperparameters.
* Parameters tested:

  * **batch_size:** [25, 32]
  * **epochs:** [100, 500]
  * **optimizer:** [adam, rmspro]
 
  
## Best Results Found:

* batch_size: 25

* epochs: 500

* optimizer: rmsprop

* Accuracy: 0.8545

---
## Tech Stack

* Python

* Keras (TensorFlow backend)

* Scikit-learn

* Pandas

* NumPy

---
## Notes

* The project emphasizes reducing overfitting and improving model stability through cross-validation and dropout regularization.

* GridSearchCV provided an optimized set of hyperparameters for better performance and consistency.
