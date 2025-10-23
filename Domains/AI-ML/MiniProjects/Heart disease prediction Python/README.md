# ❤️ Heart Disease Prediction using Python

**Contributor:** snehal492006  
**Domain:** Machine Learning | Healthcare | Python  
**Difficulty:** Intermediate  
**Tech Stack:** Python, NumPy, Pandas, Scikit-learn, Tkinter  

## 🩺 Introduction

The **Heart Disease Prediction System** processes medical data to identify patterns and predict potential heart disease risks with improved accuracy.  
It reduces the need for multiple medical tests by providing quick and reliable preliminary assessments.  

This system helps improve **patient care** through timely interventions and lifestyle recommendations.  
By integrating **machine learning** with healthcare, it enhances accessibility and promotes **early disease detection**.  
The project aims to assist both **doctors and patients** in making informed health decisions for better outcomes.

## 📘 Project Overview

1. The model analyzes patient health data to assess the likelihood of heart disease using **machine learning algorithms**.  
2. It considers various medical parameters such as **age, cholesterol, blood pressure, heart rate, and lifestyle factors**.  
3. The project uses **K-Nearest Neighbors (KNN)** as the primary classification algorithm for prediction.  
4. The system is trained on a **real-world medical dataset**, ensuring reliable and accurate performance.  
5. By combining **data preprocessing, visualization, and predictive modeling**, the project enables **early detection** and **prevention**.

## 🧠 Technologies Used

| Technology | Purpose |
| **NumPy** | Performs numerical and array operations. |
| **Pandas** | Loads and processes dataset efficiently. |
| **Scikit-learn** | Implements ML algorithms and performance evaluation. |
| **Tkinter** | Provides a graphical user interface (GUI) for predictions. |

### Scikit-learn Modules Used:
- `train_test_split` – Splits the dataset into training and testing sets.  
- `StandardScaler` – Standardizes feature data for better accuracy.  
- `KNeighborsClassifier` – Classifies patients based on KNN algorithm.  
- `accuracy_score`, `classification_report`, `confusion_matrix` – Evaluate model accuracy and performance.

## 🚀 How It Works

1. **Load Data:** The system imports a CSV dataset containing patient details and heart health parameters.  
2. **Data Preprocessing:** Data is cleaned and scaled using `StandardScaler`.  
3. **Model Training:** The **KNN classifier** is trained on 80% of the dataset.  
4. **Model Testing:** The remaining 20% is used for evaluation.  
5. **GUI Interaction:** A Tkinter-based form takes user input and predicts whether the person is at **high or low risk** of heart disease.  








## 📁 Project Structure

HeartDiseasePrediction/
├── heart.csv # Dataset file
├── heart_disease.py # Main Python file (model + GUI)
├── README.md # Project documentation
└── requirements.txt # Dependencies (optional)

## 🧩 Output Summary

- Displays **accuracy**, **classification report**, and **confusion matrix** in the console.  
- GUI form allows real-time data input (age, cholesterol, heart rate, etc.).  
- Prediction result displayed as:  
  > **"Prediction: High Risk"** or **"Prediction: Low Risk"**

## 📊 Sample Output (Console)

Accuracy: 84.50%
Classification Report:
precision recall f1-score support
0 0.85 0.82 0.83 29
1 0.84 0.86 0.85 31
Confusion Matrix:
[[24 5]
[ 4 27]]

## 🧠 Key Learnings

- Data preprocessing and feature scaling techniques.  
- Implementation of the **KNN algorithm** for classification.  
- GUI development using **Tkinter**.  
- Performance evaluation using accuracy and F1-score metrics.  
- Practical application of AI in the **healthcare domain**.
## 🏁 Conclusion

The **Heart Disease Prediction Project** effectively uses **machine learning** to assess the risk of heart disease.  
By integrating a **KNN classifier** with a **Tkinter GUI**, it provides a simple, interactive, and efficient system for predictions.  
This project demonstrates how **AI can support healthcare** in early diagnosis and decision-making.  
Future enhancements may include adding **deep learning models** or **real-time API integration** for improved accuracy.

## 👩‍💻 Author
**Snehal Baramade**  
💡 Python Developer | Machine Learning Enthusiast | Creative Thinker  


