**Contributor:** Ansh-1019

# 🧠 Voice Assistant – Friday

A beginner-friendly Python voice assistant that listens, understands, and responds to your voice commands. This project was built to explore speech recognition, text-to-speech, and smart command execution in Python.

## 🚀 Features

- 🎤 **Voice Input** — Recognizes your voice using the microphone  
- 🕓 **Tells the Time and Date** — Fetches current time and date on command  
- 🎵 **Plays Songs** — Plays songs on YouTube using `pywhatkit`  
- 😂 **Tells Jokes** — Lightens the mood with a random joke  
- 📖 **Wikipedia Summaries** — Provides brief summaries from Wikipedia  
- 🌐 **Google Search** — Searches the web for any topic  
- 🧠 **Wake Word Detection** — Activates when you say **"Friday"**

## 🛠️ Tech Stack

- Python 3.13  
- `speech_recognition` – Speech-to-text  
- `pyttsx3` – Text-to-speech  
- `pywhatkit` – YouTube/Google automation  
- `wikipedia` – Search summaries  
- `pyjokes` – Random jokes for fun  

## 🗂️ Project Structure
* `friday.py`: The main entry point for running the voice assistant.
* `stt.py`: Contains modules and functions related to Speech-to-Text conversion.
* `tts.py`: Contains modules and functions related to Text-to-Speech conversion.
* `combine.py`: (Optional) This file is for experimental code merging features.
* `README.md`: This file, providing an overview and instructions for the project.
---

## 🚀 Getting Started

To run the assistant:

```bash
python friday.py