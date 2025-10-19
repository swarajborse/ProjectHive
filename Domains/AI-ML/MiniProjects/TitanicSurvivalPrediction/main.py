# =============================================================================
# Titanic - GridSearchCV RandomForest + Submission
# =============================================================================

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# -----------------------------------------------------------------------------
# 1) Load data
train_df = pd.read_csv('train.csv')
test_df  = pd.read_csv('test.csv')

print(train_df.head())
print(train_df.info())

# -----------------------------------------------------------------------------
# (Optional) Quick EDA - SAVE PLOTS
# -----------------------------------------------------------------------------

# Survival by Sex
sns.countplot(x='Survived', hue='Sex', data=train_df)
plt.title("Survival by Sex")
plt.savefig("eda_survival_by_sex.png", dpi=300, bbox_inches='tight')
plt.close()

# Survival by Passenger Class
sns.countplot(x='Survived', hue='Pclass', data=train_df)
plt.title("Survival by Passenger Class")
plt.savefig("eda_survival_by_pclass.png", dpi=300, bbox_inches='tight')
plt.close()

# -----------------------------------------------------------------------------
# 2) Cleaning
# -----------------------------------------------------------------------------

train_df['Age'].fillna(train_df['Age'].median(), inplace=True)
test_df['Age'].fillna(test_df['Age'].median(), inplace=True)

train_df['Embarked'].fillna(train_df['Embarked'].mode()[0], inplace=True)
test_df['Embarked'].fillna(test_df['Embarked'].mode()[0], inplace=True)

test_df['Fare'].fillna(test_df['Fare'].median(), inplace=True)

for df in (train_df, test_df):
    if 'Cabin' in df.columns:
        df.drop(columns=['Cabin'], inplace=True)

encoder = LabelEncoder()
for col in ['Sex', 'Embarked']:
    train_df[col] = encoder.fit_transform(train_df[col])
    test_df[col]  = encoder.transform(test_df[col])

# -----------------------------------------------------------------------------
# 3) Features / Target
# -----------------------------------------------------------------------------
features = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]
X = train_df[features]
y = train_df["Survived"]
test_X = test_df[features]

# -----------------------------------------------------------------------------
# 4) Train/Validation split
# -----------------------------------------------------------------------------
X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -----------------------------------------------------------------------------
# 5) Best model: RandomForest + GridSearchCV
# -----------------------------------------------------------------------------
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [5, 10, None],
    'min_samples_split': [2, 5, 10],
    'max_features': ['sqrt', 'log2']
}

grid = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid=param_grid,
    cv=3,
    scoring='accuracy',
    n_jobs=-1
)

grid.fit(X_train, y_train)

print("Best Parameters:", grid.best_params_)
print("Best CV Score:", grid.best_score_)

# Validation score using the best estimator found by CV
best_rf_val_pred = grid.best_estimator_.predict(X_val)
print("Validation Accuracy (best RF):", accuracy_score(y_val, best_rf_val_pred))

# -----------------------------------------------------------------------------
# 6) Final training on ALL data + Submission
# -----------------------------------------------------------------------------
best_rf = grid.best_estimator_
best_rf.fit(X, y)  # retrain on the full training data

test_preds = best_rf.predict(test_X)

submission = pd.DataFrame({
    "PassengerId": test_df["PassengerId"],
    "Survived": test_preds
})
submission.to_csv("submission.csv", index=False)
print("submission.csv created ✅")

# quick sanity checks
print(submission.head())
print(submission['Survived'].value_counts())

# -----------------------------------------------------------------------------
# 7) Save Feature Importances Plot
# -----------------------------------------------------------------------------
importances = best_rf.feature_importances_
features = X.columns

sns.barplot(x=importances, y=features)
plt.title("Feature Importances")
plt.savefig("rf_feature_importances.png", dpi=300, bbox_inches='tight')
plt.close()