from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from django.http import HttpResponseRedirect
import nltk
from nltk.stem import WordNetLemmatizer
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
from numpy import pi
from googletrans import Translator, LANGUAGES
from translate import Translator
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
import operator
from django.views import View
# Create your views here.
def uploadOpti(request):
    # file = open(file_name, "r")
    # filedata = file.readlines()
    
    # return filedata
    if request.method == 'POST':
        upload_f = request.FILES['file']
        # data_file = open(upload_f,"r")
        # data = data_file.read()
        data = upload_f.read()
        return redirect('Optimize', output=data)
    else:
        return redirect('Optimize', output=None)

def split_sentence(data):
    article = data.split(". ")
    sentences = []

    for sentence in article:
        #print(sentence)
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    sentences.pop() 
    
    return sentences

def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []
 
    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]
 
    all_words = list(set(sent1 + sent2))
 
    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)
 
    # build the vector for the first sentence
    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1
 
    # build the vector for the second sentence
    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1
 
    return 1 - cosine_distance(vector1, vector2)
 
def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))
 
    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2: #ignore if both are same sentences
                continue 
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix


def Summary(request):
    ajx = False
    if request.method == "POST":
        text = request.POST.get('text')
        #flag = request.POST.get('flag')
        count = len(nltk.tokenize.sent_tokenize(text))
        print(count)
        top_n = 0
       
        if request.is_ajax():
            if count == 1:
                return JsonResponse({'output':'Text is already summarized.'},status=200)
            top_n = int(count*0.6)    
            ajx = True
        else:
            top_n = int(request.POST.get('n'))
            if top_n == count:
                return render(request,'Summary.html',{'output':text,'text':text})
            elif top_n > count:
                return render(request,'Summary.html',{'output':'Please enter appropriate value for frequency count!!','text':text})
            elif count == 1:
                return render(request,'Summary.html',{'output':'Text is already summarized.','text':text})
        nltk.download("stopwords")
        stop_words = stopwords.words('english')
        summarize_text = []

        # Step 1 - Read text anc split it
        data = text
        sentences = split_sentence(data)
        # Step 2 - Generate Similary Martix across sentences
        sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)

        # Step 3 - Rank sentences in similarity martix
        sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
        scores = nx.pagerank(sentence_similarity_graph)

        # Step 4 - Sort the rank and pick top sentences
        ranked_sentence = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)    
        #print("Indexes of top ranked_sentence order are ", ranked_sentence)    

        for i in range(top_n):
            summarize_text.append(" ".join(ranked_sentence[i][1]))

        # Step 5 - Offcourse, output the summarize texr
        print("Summarize Text: \n", ". ".join(summarize_text))
        summary = ". ".join(summarize_text)
        if ajx:
            return JsonResponse({'output':summary},status=200)
        else:
            return render(request,'Summary.html',{'output':summary,'text':text})
    else:
        if ajx:
            return JsonResponse({'output':None},status=200)
        else:
            return render(request,'Summary.html',context=None)

def home(request):
    return render(request,'home.html',context=None)
# def Summary(request):
#     return render(request,'Summary.html',context=None)
def About(request):
    return render(request,'About.html',context=None)        

def Sentiment(request):
    ajx = False
    if request.method=="POST" and request.POST.get('text'):
        
        if request.is_ajax():
            ajx = True
        text = request.POST.get('text')   
        print(text) 
        sid = SentimentIntensityAnalyzer()

        #message_text = '''It seems to me we are in the middle of no man's land with respect to the  following:  Opec production speculation, Mid east crisis and renewed  tensions, US elections and what looks like a slowing economy (?), and no real weather anywhere in the world. I think it would be most prudent to play  the markets from a very flat price position and try to day trade more aggressively. I have no intentions of outguessing Mr. Greenspan, the US. electorate, the Opec ministers and their new important roles, The Israeli and Palestinian leaders, and somewhat importantly, Mother Nature.  Given that, and that we cannot afford to lose any more money, and that Var seems to be a problem, let's be as flat as possible. I'm ok with spread risk  (not front to backs, but commodity spreads). The morning meetings are not inspiring, and I don't have a real feel for  everyone's passion with respect to the markets.  As such, I'd like to ask  John N. to run the morning meetings on Mon. and Wed.  Thanks. Jeff'''

        message = text
        

        # Calling the polarity_scores method on sid and passing in the message_text outputs a dictionary with negative, neutral, positive, and compound scores for the input text
        scores = sid.polarity_scores(message)

        # Here we loop through the keys contained in scores (pos, neu, neg, and compound scores) and print the key-value pairs on the screen
        d={}
        for key in sorted(scores):
            print('{0}: {1}, '.format(key, scores[key]), end='')
            val = round(scores[key]*100,2)
            d.update({key:val})
        print(d)
        
        d.update({"flag":1,"text":text})
        print(d)
        
        if ajx:
            return JsonResponse(d,status=200)
        else:
            return render(request,'Sentiment.html',context=d)  
    else:
        if ajx:
            return JsonResponse(None,status=200)
        else:
            return render(request,'Sentiment.html',{"message":None})  

def LangTranslate(request):
    language = list(LANGUAGES.values())
    ajx = False
    if request.method == 'POST' and request.POST.get('text'):
        text=request.POST.get('text')
        if request.is_ajax():
            ajx = True
        
        inputLanguage = str(request.POST.get('in_lang')).lower()
        outputLanguage = str(request.POST.get('out_lang')).lower()
        dataToTranslate = request.POST.get('text')
        print(inputLanguage,outputLanguage)
        translator= Translator(from_lang= inputLanguage,to_lang=outputLanguage)
        translation = translator.translate(dataToTranslate )
        if ajx:
            return JsonResponse({'translation': translation, 'language': language, 'text':text},status=200)
        else:    
            return render(request, 'LangTranslate.html', {'translation': translation, 'language': language, 'text':text})
    else:
        if ajx:
            return JsonResponse(None,status=200)
        else:
            return render(request, 'LangTranslate.html', {'language': language})
    
def Optimize(request):
    if request.method=='POST' and request.POST.get("text"):
        #FREQUENT WORDS
        # text = "Hello my name is Apoorva. My name is also popo. My home is in Indore/Sagar."
        tool = language_tool_python.LanguageTool('en-US')
        text=request.POST.get('text')
        t1=text
        matches = tool.check(t1)
        #print(matches)

        my_mistakes = []
        my_corrections = []
        start_positions = []
        end_positions = []
        
        for rules in matches:
            if len(rules.replacements)>0:
                start_positions.append(rules.offset)
                end_positions.append(rules.errorLength+rules.offset)
                my_mistakes.append(text[rules.offset:rules.errorLength+rules.offset])
                my_corrections.append(rules.replacements[0])
            
        
            
        my_new_text = list(t1)
        
        
        for m in range(len(start_positions)):
            for i in range(len(text)):
                my_new_text[start_positions[m]] = my_corrections[m]
                if (i>start_positions[m] and i<end_positions[m]):
                    my_new_text[i]=""
            
        my_new_text = "".join(my_new_text)

        print(my_new_text)
                
        #FREQUENT WORDS 
        stop_words = set(stopwords.words('english')) #for removing is, an, in, etc
        tokenizer = nltk.RegexpTokenizer(r"\w+") #removing punctuatuons.
        words = tokenizer.tokenize(t1)

        st = WordNetLemmatizer()
        filtered_sentence = [w for w in words if not w in stop_words and len(w)!=1]
        lemmas = set(st.lemmatize(fs) for fs in filtered_sentence)
        n = int(len(lemmas)*0.3)
        frequency = Counter(lemmas)
        print(frequency)

        n_items = dict( sorted(frequency.items(), key=operator.itemgetter(1),reverse=True)[:n])
        #SYNONYMS
        synonyms = {}

        for f in n_items:
            for syn in wordnet.synsets(f): 
                s = set()
                if len(syn.lemmas()) == 1:
                    continue
                for l in syn.lemmas(): 
                    s.add(l.name())
                synonyms[f] = ','.join(list(s))

        print(synonyms)
        return render(request,'Optimize.html',{'optimized':my_new_text,"fl_1":1,"text":text,'words':synonyms})
    else:
        return render(request,'Optimize.html',context=None)    