import speech_recognition as sr
import pyttsx3
import datetime
import pywhatkit
import pyjokes
import wikipedia

def taking_command():
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("Calibrating background noise...")
        r.adjust_for_ambient_noise(source,duration=0.3)
        print("Listening...")
        audio = r.listen(source)
    try:
        text= r.recognize_google(audio)
        print(text)
        return(text)
    except sr.RequestError:
        print("check your internet")
        responding("check your internet")
    except sr.UnknownValueError:
        print("cannot understand")
        responding("cannot understand")

def responding(text):
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[2].id)
    engine.say(text)
    engine.runAndWait()

def function():
    audio=taking_command()

    if audio is None:
        return

    audio=audio.lower()

    if 'time' in audio:
       time= datetime.datetime.now().strftime('%I:%M %p')
       print("current time is "+time)
       responding("current time is "+time)

    elif 'play' in audio:
        song= audio.replace('play','').strip()
        responding("playing"+song)
        pywhatkit.playonyt(song)
    
    elif 'joke' in audio:
        joke=pyjokes.get_joke()
        print(joke)
        responding(joke)

    elif 'tell me' in audio:
        inf= audio.replace('tell me','')
        info= wikipedia.summary(inf ,2)
        print(info)
        responding(info)

    elif 'date' in audio:
        date= datetime.datetime.today().strftime('%d %B %Y')
        print("today's date is "+date)
        responding("today's date is "+date)
        
    elif 'google' in audio:
        data= audio.replace('google','').strip()
        responding("googling"+data)
        pywhatkit.search(data)

def wake_word():
    while True:
        text = taking_command()
        if text and 'friday' in text.lower():
            responding("yes captain, what can i do for you")
            return

if __name__=="__main__":
    responding("friday activated")
    while True:
        wake_word()
        function()
        