## 📌 Overview
This project applies **Machine Learning** techniques to predict passenger survival on the **Titanic** dataset.  
The model is trained using **RandomForest + GridSearchCV**, achieving a **Kaggle score of 0.77751 (Top 22%)**.

---

## 📊 Dataset Information
| Feature          | Description                           |
|------------------|---------------------------------------|
| PassengerId      | Unique ID of each passenger           |
| Pclass           | Ticket class (1 = 1st, 2 = 2nd, 3 = 3rd) |
| Name             | Passenger name                        |
| Sex              | Gender                                |
| Age              | Age in years                          |
| SibSp            | # of siblings/spouses aboard          |
| Parch            | # of parents/children aboard          |
| Ticket           | Ticket number                         |
| Fare             | Passenger fare                        |
| Cabin            | Cabin number                          |
| Embarked         | Port of Embarkation (C, Q, S)         |
| Survived (Target)| 0 = No, 1 = Yes                       |

- **Samples:** 891 (train) + 418 (test)  
- **Classes:** 2 (Survived, Not Survived)  
- **Source:** [Kaggle Titanic Dataset](https://www.kaggle.com/c/titanic)

---

## 🖼️ Visualizations

1️⃣ Survival based on Sex
<p align="center">
  <img src="eda_survival_by_sex.png" width="80%">
</p>

2️⃣ Survival based on Passenger Class
<p align="center">
  <img src="eda_survival_by_pclass.png" width="80%">
</p>

3️⃣ Random Forest Feature Importance
<p align="center">
  <img src="rf_feature_importances.png" width="80%">
</p>