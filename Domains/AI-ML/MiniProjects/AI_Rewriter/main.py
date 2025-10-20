import streamlit as st
# autotokenizer for converting words into token
# automedelforseq2seq loads a sequnenvce to sequence model for text generation and rewrting
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

@st.cache_resource #load model from cache if exists
def load_model():
    model_name = "google/flan-t5-small"
    tokenizer = AutoTokenizer.from_pretrained(model_name) # laods tokenizer
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name) # loads actual neural network
    return tokenizer, model

tokenizer , model = load_model()

st.title("🧠 AI Text Rewriter")
st.write("Rewrite your text into different tones using AI (FLAN-T5).")

user_text = st.text_area("Enter text to rewrite", height=150)
style = st.selectbox("Choose rewriting style", ["Formal", "Casual", "Persuasive"])

if st.button("Rewrite Text"):
    if user_text.strip() == "":
        st.warning("Please enter some text first!") 
    else:
        prompt = f"Rewrite the following text in a {style.lower()} tone:\n\n{user_text}"
        # return sensors as torches
        # max_length to limit input size
        # truncation to cut off extra long inputs 
        inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        
        outputs = model.generate(**inputs, max_length=256, temperature=0.7)
        # decode tokens and skip special tokens
        rewritten = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        st.subheader("✨ Rewritten Text:")
        st.write(rewritten)



