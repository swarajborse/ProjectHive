import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
import tkinter as tk
from tkinter import ttk

def predict():
    try:
        # Get user input and validate
        user_data = []
        for label in labels:
            value = entrys[label].get().strip()  # Remove spaces
            if not value:  # Empty input check
                result_label.config(text="Error: All fields must be filled!", foreground="red")
                return
            user_data.append(float(value))  # Convert to float

        # Convert input to numpy array and reshape
        user_data = np.array(user_data).reshape(1, -1)

        # Ensure input matches training data feature count
        if user_data.shape[1] != X_train.shape[1]:
            result_label.config(text=f"Error: Expected {X_train.shape[1]} features, got {user_data.shape[1]}.", foreground="red")
            return

        # Standardize input
        user_input_scaled = scaler.transform(user_data)

        # Predict
        prediction = knn_classifier.predict(user_input_scaled)

        # Display result
        result_label.config(text=f"Prediction: {'High Risk' if prediction[0] == 1 else 'Low Risk'}", foreground="green")

    except ValueError:
        result_label.config(text="Error: Please enter valid numeric values!", foreground="red")

# Load dataset
dataset = pd.read_csv('heart.csv')

# Define features and target
X = dataset.drop(columns=['target']).values  # Drop target column, use only features
y = dataset['target'].values  # Target column

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize data
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
knn_classifier = KNeighborsClassifier(n_neighbors=5)
knn_classifier.fit(X_train, y_train)

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Predict on test data
y_pred = knn_classifier.predict(X_test)

# Calculate and print accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

# Print detailed classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Print confusion matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Create GUI
root = tk.Tk()
root.title("Heart Disease Prediction Form")

# Feature labels (Must match dataset column names)
labels = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang',
    'oldpeak', 'slope', 'ca', 'thal'
]

# Entry fields
entrys = {}
for i, label_text in enumerate(labels):
    ttk.Label(root, text=label_text.capitalize()).grid(row=i, column=0, sticky='e', pady=5)
    entrys[label_text] = ttk.Entry(root, width=10)
    entrys[label_text].grid(row=i, column=1, pady=5)

# Predict button
ttk.Button(root, text="Predict", command=predict).grid(row=len(labels), column=0, columnspan=2, pady=10)

# Result label
result_label = ttk.Label(root, text="")
result_label.grid(row=len(labels) + 1, column=0, columnspan=2, pady=10)

# Start GUI
root.mainloop()
