# 🖼️ Image Classifier Using Transfer Learning

**Contributor:** vatsalgupta2004  
**Domain:** AI-ML  
**Difficulty:** Intermediate  
**Tech Stack:** Python, TensorFlow/Keras, MobileNetV2, Streamlit

---

## 📝 Description

A powerful image classification application using Transfer Learning with MobileNetV2 pre-trained on ImageNet. The application features a beautiful web interface built with Streamlit that allows users to upload images and get instant predictions with confidence scores. Supports 1000+ object categories including animals, vehicles, objects, and more.

---

## 🎯 Features

- ✅ **Pre-trained MobileNetV2 Model** - Leverages transfer learning for accurate predictions
- ✅ **1000+ Categories** - Recognizes animals, vehicles, objects, food, and more
- ✅ **Web Interface** - Beautiful Streamlit UI for easy interaction
- ✅ **Real-time Predictions** - Instant classification with confidence scores
- ✅ **Top-5 Predictions** - Shows the top 5 most likely categories
- ✅ **Image Preprocessing** - Automatic image resizing and normalization
- ✅ **Drag & Drop Upload** - Easy image upload interface
- ✅ **Confidence Visualization** - Progress bars for prediction confidence
- ✅ **Multiple Format Support** - JPG, PNG, JPEG supported
- ✅ **Lightweight & Fast** - MobileNetV2 optimized for speed

---

## 🛠️ Tech Stack

- **Python 3.8+** - Core programming language
- **TensorFlow 2.x** - Deep learning framework
- **Keras** - High-level neural networks API
- **MobileNetV2** - Pre-trained CNN model
- **Streamlit** - Web application framework
- **Pillow** - Image processing
- **NumPy** - Numerical computations

---

## 📋 Prerequisites

- Python 3.8 or higher
- pip package manager
- 4GB+ RAM recommended
- Internet connection (for first-time model download)

---

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   cd Domains/AI-ML/MiniProjects/ImageClassifier
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

---

## 💻 Usage

1. **Run the Streamlit app:**
   ```bash
   streamlit run app.py
   ```

2. **Open your browser:**
   - The app will automatically open at `http://localhost:8501`
   - Or manually navigate to the URL shown in terminal

3. **Classify images:**
   - Click "Browse files" or drag & drop an image
   - Wait for instant predictions
   - View top 5 predictions with confidence scores

---

## 📁 Project Structure

```
ImageClassifier/
│
├── app.py                 # Main Streamlit application
├── classifier.py          # Image classification logic
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── .gitignore            # Git ignore file
│
└── samples/              # Sample test images (optional)
    ├── dog.jpg
    ├── car.jpg
    └── pizza.jpg
```

---

## 🔧 How It Works

1. **Model Loading:**
   - Uses MobileNetV2 pre-trained on ImageNet dataset
   - Includes top classification layer for 1000 categories
   - Weights are downloaded automatically on first run

2. **Image Preprocessing:**
   - Resizes image to 224x224 pixels
   - Normalizes pixel values to [-1, 1] range
   - Applies MobileNetV2-specific preprocessing

3. **Prediction:**
   - Passes preprocessed image through the network
   - Decodes predictions to human-readable labels
   - Returns top-5 predictions with confidence scores

4. **Visualization:**
   - Displays uploaded image
   - Shows predictions in descending confidence order
   - Visualizes confidence with progress bars

---

## 📊 Supported Categories

The model can classify **1000+ categories** including:

- 🐕 **Animals:** Dogs, cats, birds, reptiles, insects
- 🚗 **Vehicles:** Cars, trucks, airplanes, boats, bicycles
- 🍕 **Food:** Pizza, burgers, fruits, vegetables, desserts
- 🏠 **Objects:** Furniture, electronics, tools, clothing
- 🌳 **Nature:** Trees, flowers, landscapes, weather
- 🎸 **Instruments:** Guitars, pianos, drums, violins
- 🏈 **Sports:** Balls, equipment, gear
- And many more!

---

## 🎨 Example Use Cases

1. **Educational Tool:** Learn about object recognition and AI
2. **Content Moderation:** Automatically tag and categorize images
3. **Photo Organization:** Auto-tag photos in your collection
4. **Product Recognition:** Identify products from images
5. **Wildlife Identification:** Recognize animals and plants
6. **Quality Control:** Classify manufactured products
7. **Research:** Study transfer learning and CNNs

---

## 🧪 Testing

Try these sample images to test the classifier:

- **Animals:** Upload pictures of pets, wildlife, or insects
- **Vehicles:** Cars, bikes, planes, boats
- **Food:** Restaurant dishes, fruits, vegetables
- **Objects:** Household items, electronics, tools
- **Nature:** Flowers, trees, landscapes

---

## 📈 Model Performance

- **Architecture:** MobileNetV2 (Inverted Residuals)
- **Parameters:** ~3.5 million
- **Input Size:** 224x224x3
- **Training Dataset:** ImageNet (1.2M images, 1000 classes)
- **Top-1 Accuracy:** ~71.8% on ImageNet validation set
- **Top-5 Accuracy:** ~90.8% on ImageNet validation set
- **Inference Speed:** ~30-50ms per image (CPU)

---

## 🔮 Future Enhancements

- [ ] Add custom model training capability
- [ ] Support for video classification
- [ ] Batch processing for multiple images
- [ ] Export predictions to CSV/JSON
- [ ] Confidence threshold filtering
- [ ] Model selection (VGG, ResNet, EfficientNet)
- [ ] Image augmentation preview
- [ ] Deployment to cloud (Heroku, AWS, GCP)
- [ ] Mobile app version
- [ ] API endpoint creation

---

## 🐛 Troubleshooting

**Issue:** Model download fails
- **Solution:** Check internet connection, try again, or manually download weights

**Issue:** Out of memory error
- **Solution:** Close other applications, use smaller batch size, or upgrade RAM

**Issue:** Slow predictions
- **Solution:** Use GPU if available, or consider using MobileNetV2 Alpha=0.5 for faster inference

**Issue:** Incorrect predictions
- **Solution:** Ensure good image quality, proper lighting, and clear object visibility

---

## 📚 Learning Resources

- [TensorFlow Documentation](https://www.tensorflow.org/api_docs)
- [MobileNetV2 Paper](https://arxiv.org/abs/1801.04381)
- [Transfer Learning Guide](https://www.tensorflow.org/tutorials/images/transfer_learning)
- [ImageNet Dataset](https://www.image-net.org/)
- [Streamlit Documentation](https://docs.streamlit.io/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new features
- Improve model performance
- Enhance UI/UX
- Fix bugs
- Add documentation

---

## 📄 License

This project is created for **Hacktoberfest 2025** and educational purposes.

---

## 🙏 Acknowledgments

- **TensorFlow Team** - For the amazing deep learning framework
- **Google** - For MobileNetV2 architecture
- **ImageNet** - For the comprehensive dataset
- **Streamlit** - For the intuitive web framework
- **Hacktoberfest 2025** - For promoting open source

---

## 📧 Contact

Created by **vatsalgupta2004** for Hacktoberfest 2025

- GitHub: [@vatsalgupta2004](https://github.com/vatsalgupta2004)
- Project: [ProjectHive](https://github.com/vatsalgupta2004/ProjectHive)

---

**⭐ If you find this project helpful, please give it a star!**
