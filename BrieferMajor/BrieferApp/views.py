from django.shortcuts import render,redirect
from django.http import HttpResponse
import nltk
import language_check #grammar check
from textblob import TextBlob
from collections import Counter
from nltk.corpus import stopwords
from nltk.corpus import wordnet
nltk.download('vader_lexicon')
nltk.download('punkt')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import language_tool_python
import pandas as pd
from bokeh.io import output_file, show
from bokeh.palettes import Category20c
from bokeh.plotting import figure
from bokeh.transform import cumsum
from numpy import pi
from bokeh.embed import components
from googletrans import Translator, LANGUAGES

# Create your views here.
def home(request):
    return render(request,'home.html',context=None)
def Summary(request):
    return render(request,'Summary.html',context=None)
def About(request):
    return render(request,'About.html',context=None)        

def Sentiment(request):
    
    if request.method=="POST" and request.POST.get('text'):
        
        text = request.POST.get('text')   
        print(text) 
        sid = SentimentIntensityAnalyzer()

        message_text = '''It seems to me we are in the middle of no man's land with respect to the  following:  Opec production speculation, Mid east crisis and renewed  tensions, US elections and what looks like a slowing economy (?), and no real weather anywhere in the world. I think it would be most prudent to play  the markets from a very flat price position and try to day trade more aggressively. I have no intentions of outguessing Mr. Greenspan, the US. electorate, the Opec ministers and their new important roles, The Israeli and Palestinian leaders, and somewhat importantly, Mother Nature.  Given that, and that we cannot afford to lose any more money, and that Var seems to be a problem, let's be as flat as possible. I'm ok with spread risk  (not front to backs, but commodity spreads). The morning meetings are not inspiring, and I don't have a real feel for  everyone's passion with respect to the markets.  As such, I'd like to ask  John N. to run the morning meetings on Mon. and Wed.  Thanks. Jeff'''

        message = text
        

        # Calling the polarity_scores method on sid and passing in the message_text outputs a dictionary with negative, neutral, positive, and compound scores for the input text
        scores = sid.polarity_scores(message)

        # Here we loop through the keys contained in scores (pos, neu, neg, and compound scores) and print the key-value pairs on the screen
        d={}
        for key in sorted(scores):
            print('{0}: {1}, '.format(key, scores[key]), end='')
            d.update({key:scores[key]})
        print(d.keys())
        
        d.update({"flag":1,"text":text})
        
        return render(request,'Sentiment.html',context=d)  
    else:
        print("hii")
        return render(request,'Sentiment.html',{"message":"hello"})  

def LangTranslate(request):
    language = list(LANGUAGES.values())
    if request.method == 'POST' and request.POST.get('text'):
        
        t1=request.POST.get('text')
        try:
            inputLanguage = request.POST.get('in_lang')
            outputLanguage = request.POST.get('out_lang')
            dataToTranslate = request.POST.get('text')
            translator = Translator()
            translated = translator.translate(text=dataToTranslate, src=inputLanguage, dest=outputLanguage)
            is_Available = 'Yes'
        except Exception:
            translated = "Sorry Please Enter Valid Text"
            is_Available = 'No'
            
        return render(request, 'LangTranslate.html', {'translated': translated, 'is_Available': is_Available, 'language': language, 'text':t1,"fl":1})
    else:
        return render(request, 'LangTranslate.html', {'language': language})
    
def Optimize(request):
    if request.method=='POST' and request.POST.get("text"):
        #FREQUENT WORDS
        # text = "Hello my name is Apoorva. My name is also popo. My home is in Indore/Sagar."
        text=request.POST.get('text')
        t1=text
        stop_words = set(stopwords.words('english')) #for removing is, an, in, etc
        tokenizer = nltk.RegexpTokenizer(r"\w+") #removing punctuatuons.
        words = tokenizer.tokenize(text)

        filtered_sentence = [w for w in words if not w in stop_words]

        frequency = Counter(filtered_sentence)
        print(frequency)
        #SYNONYMS
        synonyms = []

        for f in frequency:
            for syn in wordnet.synsets(f): 
                for l in syn.lemmas(): 
                    synonyms.append(l.name()) 
        print(synonyms)
        
        return render(request,'Optimize.html',{'words':synonyms,"fl_1":1,"text":t1})
    else:
        return render(request,'Optimize.html',context=None)    