"""
Image Classifier Web Application
Author: vatsalgupta2004
Description: Streamlit web interface for image classification using Transfer Learning
"""

import streamlit as st
from PIL import Image
import time
from classifier import ImageClassifier, format_confidence, get_color_for_confidence

# Page configuration
st.set_page_config(
    page_title="AI Image Classifier",
    page_icon="🖼️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main {
        padding: 2rem;
    }
    .stButton>button {
        width: 100%;
        background-color: #FF4B4B;
        color: white;
        font-weight: bold;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    .prediction-card {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #f0f2f6;
        margin: 0.5rem 0;
    }
    .title-emoji {
        font-size: 3rem;
    }
    </style>
""", unsafe_allow_html=True)

# Initialize session state for model
@st.cache_resource
def load_model():
    """Load and cache the classification model"""
    return ImageClassifier()

def main():
    # Header
    st.markdown("<h1 style='text-align: center;'>🖼️ AI Image Classifier</h1>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center; color: gray;'>Powered by Transfer Learning & MobileNetV2</h3>", unsafe_allow_html=True)
    st.markdown("---")
    
    # Sidebar
    with st.sidebar:
        st.header("📊 About")
        st.info("""
        **Image Classifier** uses Transfer Learning with MobileNetV2 pre-trained on ImageNet.
        
        **Features:**
        - 🎯 1000+ object categories
        - ⚡ Real-time predictions
        - 📈 Confidence scores
        - 🖼️ Easy image upload
        """)
        
        st.header("🛠️ Tech Stack")
        st.markdown("""
        - **TensorFlow** - Deep Learning
        - **Keras** - Neural Networks API
        - **MobileNetV2** - CNN Model
        - **Streamlit** - Web Framework
        - **Pillow** - Image Processing
        """)
        
        st.header("📚 How to Use")
        st.markdown("""
        1. **Upload** an image (JPG, PNG, JPEG)
        2. **Wait** for automatic processing
        3. **View** top 5 predictions
        4. **Check** confidence scores
        """)
        
        st.header("👨‍💻 Developer")
        st.markdown("""
        **Contributor:** vatsalgupta2004
        
        **Hacktoberfest 2025**
        
        [GitHub](https://github.com/vatsalgupta2004)
        """)
    
    # Main content
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.header("📤 Upload Image")
        
        # File uploader
        uploaded_file = st.file_uploader(
            "Choose an image...",
            type=['jpg', 'jpeg', 'png'],
            help="Upload a JPG, JPEG, or PNG image to classify"
        )
        
        if uploaded_file is not None:
            # Display uploaded image
            image = Image.open(uploaded_file)
            st.image(image, caption='Uploaded Image', use_container_width=True)
            
            # Image info
            st.caption(f"📐 Size: {image.size[0]} x {image.size[1]} pixels")
            st.caption(f"📁 Format: {image.format}")
            st.caption(f"🎨 Mode: {image.mode}")
    
    with col2:
        st.header("🎯 Predictions")
        
        if uploaded_file is not None:
            # Show loading spinner
            with st.spinner('🔄 Analyzing image...'):
                try:
                    # Load model
                    classifier = load_model()
                    
                    # Reset file pointer
                    uploaded_file.seek(0)
                    
                    # Make prediction
                    start_time = time.time()
                    predictions = classifier.predict_from_file(uploaded_file, top_k=5)
                    inference_time = time.time() - start_time
                    
                    # Success message
                    st.success(f"✅ Classification complete! ({inference_time:.2f}s)")
                    
                    # Display predictions
                    st.subheader("🏆 Top 5 Predictions")
                    
                    for idx, (class_id, class_name, confidence) in enumerate(predictions, 1):
                        # Create expandable section for each prediction
                        with st.container():
                            col_rank, col_name, col_conf = st.columns([0.5, 2, 2])
                            
                            with col_rank:
                                # Rank emoji
                                rank_emoji = "🥇" if idx == 1 else "🥈" if idx == 2 else "🥉" if idx == 3 else f"{idx}️⃣"
                                st.markdown(f"<h2 style='text-align: center;'>{rank_emoji}</h2>", unsafe_allow_html=True)
                            
                            with col_name:
                                st.markdown(f"**{class_name}**")
                                st.caption(f"Class ID: {class_id}")
                            
                            with col_conf:
                                # Progress bar for confidence
                                st.progress(confidence / 100)
                                st.caption(format_confidence(confidence))
                            
                            st.markdown("---")
                    
                    # Additional info
                    st.info(f"""
                    **💡 Model Information**
                    - Architecture: MobileNetV2
                    - Dataset: ImageNet (1000 classes)
                    - Inference Time: {inference_time:.3f} seconds
                    - Top Prediction: {predictions[0][1]}
                    - Confidence: {predictions[0][2]:.2f}%
                    """)
                    
                except Exception as e:
                    st.error(f"❌ Error during classification: {str(e)}")
                    st.error("Please try uploading a different image.")
        else:
            # Placeholder when no image is uploaded
            st.info("👆 Upload an image to see predictions here!")
            
            st.markdown("### 🎨 Example Categories")
            st.markdown("""
            Try images of:
            - 🐕 **Animals:** Dogs, cats, birds, wildlife
            - 🚗 **Vehicles:** Cars, planes, boats, bikes
            - 🍕 **Food:** Pizza, burgers, fruits, desserts
            - 🏠 **Objects:** Furniture, electronics, tools
            - 🌳 **Nature:** Flowers, trees, landscapes
            - 🎸 **Instruments:** Guitars, pianos, drums
            - 🏈 **Sports:** Balls, equipment, gear
            - And 900+ more categories!
            """)
    
    # Footer
    st.markdown("---")
    st.markdown("""
    <div style='text-align: center;'>
        <p>Made with ❤️ for <strong>Hacktoberfest 2025</strong> by <strong>vatsalgupta2004</strong></p>
        <p>🌟 Powered by TensorFlow & MobileNetV2 | 🚀 Built with Streamlit</p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
