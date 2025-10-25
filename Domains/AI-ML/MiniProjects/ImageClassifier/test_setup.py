"""
Test script to verify the Image Classifier setup
Author: vatsalgupta2004
"""

def test_imports():
    """Test if all required packages can be imported"""
    print("🔍 Testing imports...")
    
    try:
        import tensorflow as tf
        print(f"✅ TensorFlow {tf.__version__} imported successfully")
    except ImportError as e:
        print(f"❌ TensorFlow import failed: {e}")
        return False
    
    try:
        import streamlit as st
        print(f"✅ Streamlit imported successfully")
    except ImportError as e:
        print(f"❌ Streamlit import failed: {e}")
        return False
    
    try:
        from PIL import Image
        print(f"✅ Pillow imported successfully")
    except ImportError as e:
        print(f"❌ Pillow import failed: {e}")
        return False
    
    try:
        import numpy as np
        print(f"✅ NumPy {np.__version__} imported successfully")
    except ImportError as e:
        print(f"❌ NumPy import failed: {e}")
        return False
    
    return True


def test_model_loading():
    """Test if MobileNetV2 model can be loaded"""
    print("\n🔍 Testing model loading...")
    
    try:
        from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2
        
        print("📥 Loading MobileNetV2 model (this may take a moment)...")
        model = MobileNetV2(weights='imagenet', include_top=True)
        print(f"✅ Model loaded successfully!")
        print(f"📊 Model has {model.count_params():,} parameters")
        print(f"📊 Model has {len(model.layers)} layers")
        
        return True
    except Exception as e:
        print(f"❌ Model loading failed: {e}")
        return False


def test_classifier():
    """Test the ImageClassifier class"""
    print("\n🔍 Testing ImageClassifier class...")
    
    try:
        from classifier import ImageClassifier
        
        print("📥 Initializing classifier...")
        classifier = ImageClassifier()
        print("✅ Classifier initialized successfully!")
        
        # Get model info
        info = classifier.get_model_info()
        print(f"📊 Model Name: {info['model_name']}")
        print(f"📊 Input Shape: {info['input_shape']}")
        print(f"📊 Total Parameters: {info['parameters']:,}")
        
        return True
    except Exception as e:
        print(f"❌ Classifier test failed: {e}")
        return False


def main():
    """Run all tests"""
    print("=" * 60)
    print("🧪 Image Classifier - Setup Verification Test")
    print("=" * 60)
    
    # Test imports
    if not test_imports():
        print("\n❌ Import test failed. Please install requirements:")
        print("   pip install -r requirements.txt")
        return
    
    # Test model loading
    if not test_model_loading():
        print("\n❌ Model loading test failed. Check internet connection.")
        return
    
    # Test classifier
    if not test_classifier():
        print("\n❌ Classifier test failed. Check classifier.py file.")
        return
    
    print("\n" + "=" * 60)
    print("✅ All tests passed! Your Image Classifier is ready to use!")
    print("=" * 60)
    print("\n🚀 To run the app, execute:")
    print("   streamlit run app.py")
    print("\n📚 For more information, see README.md")


if __name__ == "__main__":
    main()
