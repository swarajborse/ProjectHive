**Contributor:** Ansh-1019

# 🧠 Mental Health Text Classifier with Explainable AI (XAI)

---

## 🧠 Project Description

This project is an **AI-powered Mental Health Text Classifier** that analyzes written text to detect signs of various mental health conditions such as depression, anxiety, or suicidal ideation.
It uses a fine-tuned transformer model (vedabtpatil07/Mental-Health-Analysis) to classify user-input text and provides **explainable AI (XAI)** visualizations using **SHAP** to show which words influenced the model’s decision.

Users can interact through a Streamlit web interface, view confidence scores, and even **submit feedback** — which is stored in **Supabase** for model improvement and monitoring.

---

## 👤 Author

**Developed by:** [Ansh Jaiswal](https://www.linkedin.com/in/ansh-jaiswal-bb50592b3)  
📧 **Email:** [anshjaiswal2004@gmail.com](mailto:anshjaiswal2004@gmail.com)  
💻 **GitHub:** [Ansh-1019](https://github.com/Ansh-1019)

---

## 🚀 Features

- 🧠 **Transformer-based Model**: Uses `vedabtpatil07/Mental-Health-Analysis` from Hugging Face  
- 🔍 **Explainable AI (XAI)** with **SHAP visualizations**  
- 📊 **Confidence distribution** and detailed analysis  
- 🧾 **Feedback system** powered by **Supabase**  
- 🌗 **Elegant UI** with light theme and soft gradients  
- 🧩 **Custom SHAP visual styling** for better visibility  

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | Streamlit |
| **ML Model** | Hugging Face Transformers, PyTorch |
| **Explainability** | SHAP |
| **Database** | Supabase |
| **Backend SDK** | Supabase-Py |
| **Language** | Python 3.10+ |

---

## 📂 Project Structure

Mental-Health-Classifier/
│
├── final.py # Main Streamlit app
├── requirements.txt # Python dependencies
├── .streamlit/
│ └── secrets.toml # (Optional) Streamlit secrets (if used)
└── README.md # Project documentation

---


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Ansh-1019/Mental-Health-Analysis-NLP
cd Mental-Health-Analysis-NLP
```

### 2️⃣ Install Required Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Run the App
```bash
streamlit run final.py
```

Then open the local URL in your browser