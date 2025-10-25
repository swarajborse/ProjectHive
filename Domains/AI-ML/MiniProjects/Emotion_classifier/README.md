**Contributor:** Ansh-1019

# 🎭 Real-Time Emotion Detection using DeepFace and OpenCV

This project detects human emotions in real-time using a webcam feed.  
It utilizes the **DeepFace** library for emotion analysis and **OpenCV** for face detection and visualization.

---

## 🚀 Features

- Detects emotions such as **happy**, **sad**, **angry**, **surprise**, **neutral**, and more.  
- Works in **real-time** using your webcam.  
- Displays bounding boxes and emotion labels on detected faces.  
- Gracefully handles frames without detectable faces.

---

## 🧠 Technologies Used

- **Python 3.8+**
- **OpenCV** – for capturing webcam feed and drawing on frames.
- **DeepFace** – for facial emotion analysis.
- **Haar Cascade Classifier** – for basic face detection.

---

## 📦 Installation

### 1️⃣ Clone or Download the Repository
```bash
git clone https://github.com/yourusername/emotion-detection.git
cd emotion-detection
```

---

## ▶️ How to Run

1. Save the provided code as **`emotion.py`** in your project folder.  
2. Open **Command Prompt** or **Terminal** in that folder.  
3. Run the script:

   ```bash
   python emotion.py
    ```
4. Your webcam will open automatically.  
5. A bounding box with your detected emotion will appear on screen.  
6. Press **`q`** to quit the program.
