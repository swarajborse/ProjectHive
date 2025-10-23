import streamlit as st
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import shap
import torch
import numpy as np
import streamlit.components.v1 as components
import io
from supabase import create_client

# ---------------- Supabase Setup ----------------
SUPABASE_URL = "https://byjxoefodiidjptzqivo.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5anhvZWZvZGlpZGpwdHpxaXZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg3NjQ5NCwiZXhwIjoyMDc2NDUyNDk0fQ.xlf1VlL40r1sVY_LDwrNBvhaQGpn9IKhaiWmddhDDFM"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ---------------- Page Config & UI ----------------
st.set_page_config(page_title="Mental Health Text Classifier", page_icon="🧠", layout="centered")

# ---------------- Custom CSS ----------------
st.markdown("""
<style>
/* ===== GLOBAL STYLES ===== */
.stApp {
    background: linear-gradient(135deg, #fffaf0 0%, #fdf6e3 50%, #fefce8 100%);
    color: #1e293b;
    font-family: 'Poppins', sans-serif;
}

/* ===== HEADINGS ===== */
h1, h2, h3 {
    color: #1e293b !important; /* Dark navy for readability */
    text-shadow: 1px 1px 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 215, 0, 0.3);
    letter-spacing: 0.5px;
    font-weight: 700 !important;
    transition: all 0.3s ease;
}
h1:hover, h2:hover, h3:hover {
    color: #0f172a !important;
    text-shadow: 0 0 12px rgba(37, 99, 235, 0.3);
}

/* ===== TEXT & LABELS ===== */
p, label, .stMarkdown, .stTextInput, .stTextArea {
    color: #374151 !important;
    font-size: 16px !important;
}

/* ===== BUTTON STYLES ===== */
div.stButton > button:first-child {
    background: linear-gradient(90deg, #facc15, #fbbf24);
    color: #1e293b !important;
    border: none !important;
    border-radius: 10px !important;
    padding: 0.6em 1.5em !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 0 12px rgba(251, 191, 36, 0.5);
}
div.stButton > button:hover {
    background: linear-gradient(90deg, #fbbf24, #f59e0b);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(234, 179, 8, 0.6);
}

/* ===== TEXT AREA ===== */
textarea {
    background-color: #ffffff !important;
    color: #1e293b !important;
    border-radius: 10px !important;
    border: 1px solid #d1d5db !important;
    padding: 10px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
}
textarea:focus {
    border-color: #fbbf24 !important;
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
}

/* ===== INPUTS ===== */
input, .stTextInput > div > input {
    background-color: #ffffff !important;
    color: #1e293b !important;
    border-radius: 8px !important;
    border: 1px solid #d1d5db !important;
    padding: 6px 10px !important;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
}
input:focus {
    border-color: #facc15 !important;
    box-shadow: 0 0 10px rgba(250, 204, 21, 0.4);
}

/* ===== PROGRESS BAR ===== */
.stProgress > div > div > div {
    background-color: #fbbf24 !important;
    height: 12px !important;
    border-radius: 10px !important;
}

/* ===== FEEDBACK SECTION ===== */
[data-testid="stMarkdownContainer"] strong {
    color: #b45309 !important;
}

/* ===== GLOW BOX / CARDS ===== */
.glow-box {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(229, 231, 235, 0.8);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(250, 204, 21, 0.2);
    backdrop-filter: blur(8px);
    transition: 0.3s;
}
.glow-box:hover {
    box-shadow: 0 6px 30px rgba(234, 179, 8, 0.4);
    transform: translateY(-3px);
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background: #fbbf24;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: #f59e0b;
}
</style>

""", unsafe_allow_html=True)

# ---------------- Load Models & Explainer ----------------
@st.cache_resource
def load_models_and_explainer():
    model_name = "vedabtpatil07/Mental-Health-Analysis"
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    def f(texts):
        if isinstance(texts, np.ndarray):
            texts = texts.tolist()
        tokens = tokenizer(texts, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = model(**tokens)
            scores = torch.nn.functional.softmax(outputs.logits, dim=1).numpy()
        return scores

    masker = shap.maskers.Text(tokenizer)
    explainer = shap.Explainer(f, masker)
    classifier = pipeline("text-classification", model=model, tokenizer=tokenizer, top_k=None)
    return classifier, explainer, tokenizer, model

classifier, explainer, tokenizer, model = load_models_and_explainer()

# ---------------- Explanation Function ----------------
def generate_textual_explanation(shap_values, primary_label):
    try:
        label2id = model.config.label2id
        predicted_class_index = label2id[primary_label]
        sv = shap_values[0, :, predicted_class_index]
        words, values = sv.data, sv.values

        word_impacts = sorted(
            [(word, value) for word, value in zip(words, values) if isinstance(word, str) and word.strip()],
            key=lambda x: x[1],
            reverse=True
        )
        top_contributors = [word for word, value in word_impacts if value > 0][:3]

        if not top_contributors:
            return "The model's decision was based on the overall context rather than specific keywords."

        explanation = f"The model predicted {primary_label} mainly because of words like "
        explanation += ", ".join(f"'{w}'" for w in top_contributors) + "."
        return explanation
    except Exception as e:
        return f"Could not generate textual explanation. Reason: {e}"

# ---------------- Landing Page ----------------
if "started" not in st.session_state:
    st.session_state.started = False

if not st.session_state.started:
    st.title("🧠 Mental Health Text Classifier with XAI")
    st.markdown("""
        ### AI-powered Mental Health Text Analyzer
        with Explainable AI (XAI) to show you why a prediction was made.
        ---
        ⚠ Disclaimer: This tool is for **research/educational purposes only.**
    """)
    if st.button("🚀 Get Started"):
        st.session_state.started = True
        st.rerun()
    st.stop()

# ---------------- Main UI ----------------
st.header("💬 Enter Your Text")
user_input = st.text_area("Paste text here:", height=150)

# ---------------- Analyze ----------------
if st.button("🔎 Analyze"):
    if user_input.strip():
        with st.spinner("Analyzing text..."):
            results = classifier(user_input)[0]
            results = sorted(results, key=lambda x: x['score'], reverse=True)
            top_result = results[0]
            primary_label = top_result['label']

            # Save last prediction for feedback
            st.session_state.last_prediction = {
                "user_input": user_input,
                "predicted_label": primary_label,
                "confidence": round(top_result["score"] * 100, 2)
            }

        st.success(f"### ✅ Primary Result: {primary_label} detected (Confidence: {top_result['score'] * 100:.2f}%)")

        st.write("### 📊 Confidence Distribution:")
        for res in results:
            st.write(f"{'🔴' if res['label'].lower() in ['depression', 'anxiety', 'suicidal ideation'] else '🟢'} {res['label']} ({res['score']*100:.2f}%)")
            st.progress(int(res['score']*100))

        st.write("---")
        st.write("### 💡 Prediction Explanation (XAI)")
        with st.spinner("Generating explanation..."):
            try:
                shap_values_obj = explainer([user_input])
                textual_explanation = generate_textual_explanation(shap_values_obj, primary_label)

                label2id = model.config.label2id
                predicted_class_index = label2id[primary_label]
                sv_for_plot = shap_values_obj[0, :, predicted_class_index]

                force_plot = shap.plots.force(
                    sv_for_plot.base_values,
                    sv_for_plot.values,
                    sv_for_plot.data,
                    matplotlib=False
                )

                buffer = io.StringIO()
                shap.save_html(buffer, force_plot)
                shap_html = buffer.getvalue()

                # --- START: MODIFICATIONS FOR DARK THEME VISIBILITY ---
                shap_html = shap_html.replace("color:#333;", "color:#ffffff;") 
                shap_html = shap_html.replace("color:#444;", "color:#e0e0e0;")
                shap_html = shap_html.replace("color: rgb(51, 51, 51);", "color: #ffffff;")
                                
                # Target SVG fill/stroke attributes for text
                shap_html = shap_html.replace("fill:#333;", "fill:#ffffff;")
                shap_html = shap_html.replace("fill:#444;", "fill:#e0e0e0;")
                shap_html = shap_html.replace("fill: rgb(51, 51, 51);", "fill: #ffffff;")
 
                # Target stroke for the axis line and ticks (changed to light yellow/gold: #fbbf24)
                shap_html = shap_html.replace("stroke:#000000;", "stroke:#fbbf24;")
                shap_html = shap_html.replace("stroke:#333;", "stroke:#fbbf24;")
                shap_html = shap_html.replace("stroke: #000000", "stroke: #fbbf24")
                # --- END: MODIFICATIONS FOR DARK THEME VISIBILITY ---

                # --- DARK THEME FIXES (Full Coverage for Axis & Labels) ---

                # Cover every known dark color format SHAP uses
                dark_colors = [
                    "#000", "#000000", "#111", "#222", "#333", "#444", "#555",
                    "rgb(0, 0, 0)", "rgb(17, 17, 17)", "rgb(34, 34, 34)",
                    "rgb(51, 51, 51)", "rgb(68, 68, 68)"
                ]

                for dark in dark_colors:
                    shap_html = shap_html.replace(f"fill:{dark}", "fill:#fbbf24")
                    shap_html = shap_html.replace(f"color:{dark}", "color:#fbbf24")
                    shap_html = shap_html.replace(f"stroke:{dark}", "stroke:#fbbf24")
                    shap_html = shap_html.replace(f"style=\"color:{dark};\"", "style=\"color:#fbbf24;\"")
                    shap_html = shap_html.replace(f"style='color:{dark};'", "style='color:#fbbf24;'")

                # Handle inline style blocks for axis text (like <text style="fill: rgb(51,51,51);">)
                shap_html = shap_html.replace("style=\"fill: rgb(51, 51, 51);\"", "style=\"fill:#fbbf24;\"")
                shap_html = shap_html.replace("style='fill: rgb(51, 51, 51);'", "style='fill:#fbbf24;'")

                # Make axis lines, tick marks, and text stand out
                shap_html = shap_html.replace("stroke-width:1;", "stroke-width:1; stroke:#fbbf24;")
                shap_html = shap_html.replace("<text ", "<text font-weight='600' ")

                # Optional: make 'base value' label brighter
                shap_html = shap_html.replace(">base value<", "><tspan fill='#fbbf24'>base value</tspan><")



                st.markdown(f"Summary: {textual_explanation}")
                st.markdown("Detailed Breakdown: Red words pushed the prediction higher, blue words pushed it lower.")
                components.html(shap_html, height=150, scrolling=True)
            except Exception as e:
                st.error(f"Error generating explanation: {e}")
    else:
        st.warning("⚠ Please enter some text before analyzing.")

# ---------------- Feedback ----------------
st.subheader("💬 Feedback")
st.write("Did the AI get it right?")

if "last_prediction" in st.session_state:
    if "session_id" not in st.session_state:
        st.session_state.session_id = np.random.randint(100000)

    col1, col2 = st.columns(2)
    with col1:
        feedback_choice = st.radio(
            "Model's prediction was:",
            ["✅ Correct", "❌ Incorrect"],
            key=f"feedback_radio_{st.session_state.session_id}"
        )
    with col2:
        user_label = st.text_input(
            "If incorrect, what should it be? (Optional)",
            key=f"feedback_label_{st.session_state.session_id}"
        )
        user_comments = st.text_area(
            "Any additional comments:",
            height=80,
            key=f"feedback_comments_{st.session_state.session_id}"
        )

    if st.button("📨 Submit Feedback", key="feedback_submit"):
        try:
            pred = st.session_state.last_prediction
            payload = {
                "session_id": "session_" + str(np.random.randint(100000)),
                "user_input": pred["user_input"],
                "predicted_label": pred["predicted_label"],
                "confidence": pred["confidence"],
                "feedback_choice": feedback_choice,
                "user_label": user_label or None,
                "user_comments": user_comments or None,
                "app_version": "v1.0",
                "status": "unchecked"
            }

            response = supabase.table("feedback").insert(payload).execute()

            if response.data:
                st.success("✅ Feedback saved successfully!")
            else:
                st.error("⚠ Something went wrong while saving feedback.")
        except Exception as e:
            st.error(f"❌ Failed to save feedback: {e}")
else:
    st.info("Analyze some text first to submit feedback.")
