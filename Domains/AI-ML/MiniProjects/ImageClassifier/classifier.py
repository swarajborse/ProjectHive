"""
Image Classifier using Transfer Learning with MobileNetV2
Author: vatsalgupta2004
Description: Core classification logic for image prediction
"""

import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
from PIL import Image
import io

class ImageClassifier:
    """
    Image Classifier using pre-trained MobileNetV2 model
    """
    
    def __init__(self):
        """
        Initialize the classifier with MobileNetV2 model
        """
        print("🔄 Loading MobileNetV2 model...")
        # Load pre-trained MobileNetV2 model with ImageNet weights
        self.model = MobileNetV2(
            weights='imagenet',
            include_top=True,  # Include classification layer
            input_shape=(224, 224, 3)
        )
        print("✅ Model loaded successfully!")
        
    def preprocess_image(self, img):
        """
        Preprocess image for MobileNetV2 model
        
        Args:
            img: PIL Image object
            
        Returns:
            Preprocessed numpy array ready for prediction
        """
        # Resize image to 224x224 (MobileNetV2 input size)
        img = img.resize((224, 224))
        
        # Convert to RGB if necessary (handle RGBA, grayscale, etc.)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Convert to numpy array
        img_array = image.img_to_array(img)
        
        # Add batch dimension (model expects batches)
        img_array = np.expand_dims(img_array, axis=0)
        
        # Apply MobileNetV2-specific preprocessing (scales to [-1, 1])
        img_array = preprocess_input(img_array)
        
        return img_array
    
    def predict(self, img, top_k=5):
        """
        Predict the class of an image
        
        Args:
            img: PIL Image object
            top_k: Number of top predictions to return
            
        Returns:
            List of tuples (class_id, class_name, confidence)
        """
        # Preprocess the image
        processed_img = self.preprocess_image(img)
        
        # Make prediction
        predictions = self.model.predict(processed_img, verbose=0)
        
        # Decode predictions to human-readable labels
        decoded_predictions = decode_predictions(predictions, top=top_k)[0]
        
        # Format results: (class_id, class_name, confidence)
        results = []
        for pred in decoded_predictions:
            class_id = pred[0]
            class_name = pred[1].replace('_', ' ').title()
            confidence = float(pred[2]) * 100  # Convert to percentage
            results.append((class_id, class_name, confidence))
        
        return results
    
    def predict_from_file(self, image_file, top_k=5):
        """
        Predict from uploaded file object
        
        Args:
            image_file: File-like object (from Streamlit file uploader)
            top_k: Number of top predictions to return
            
        Returns:
            List of tuples (class_id, class_name, confidence)
        """
        # Load image from file
        img = Image.open(image_file)
        
        # Make prediction
        return self.predict(img, top_k)
    
    def get_model_info(self):
        """
        Get information about the loaded model
        
        Returns:
            Dictionary with model information
        """
        return {
            'model_name': 'MobileNetV2',
            'input_shape': (224, 224, 3),
            'parameters': self.model.count_params(),
            'layers': len(self.model.layers),
            'trainable_params': sum([np.prod(v.shape) for v in self.model.trainable_weights]),
            'non_trainable_params': sum([np.prod(v.shape) for v in self.model.non_trainable_weights])
        }


def format_confidence(confidence):
    """
    Format confidence score for display
    
    Args:
        confidence: Float confidence value (0-100)
        
    Returns:
        Formatted string with confidence
    """
    if confidence >= 90:
        emoji = "🟢"
        label = "Very High"
    elif confidence >= 70:
        emoji = "🟡"
        label = "High"
    elif confidence >= 50:
        emoji = "🟠"
        label = "Medium"
    else:
        emoji = "🔴"
        label = "Low"
    
    return f"{emoji} {confidence:.2f}% ({label} Confidence)"


def get_color_for_confidence(confidence):
    """
    Get color code based on confidence level
    
    Args:
        confidence: Float confidence value (0-100)
        
    Returns:
        Color name for Streamlit
    """
    if confidence >= 70:
        return "green"
    elif confidence >= 50:
        return "orange"
    else:
        return "red"
